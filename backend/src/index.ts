import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config"
import cors from "cors";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import session from "express-session";
import { __prod__ } from "./constants";
import redis from "redis";
import connectRedis from "connect-redis"
import path from "path"
import RateLimitStore from "rate-limit-redis";
import rateLimit from "express-rate-limit";
import StudentRouter from "./resolvers/StudentRouter";
import CommentRouter from "./resolvers/CommentRouter";
import SurveyRouter from "./resolvers/SurveyRouter";
import { createServer } from "http";
import { Server } from "socket.io";

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

declare module "express-session" {
    export interface SessionData {
      userId: any;
      loadedCount: number;
    }
  }

const main = async () => {
    const app = express()
    const orm = await MikroORM.init(mikroConfig); 


/*     const BADCOMMENTS = await orm.em.find(Kommentar, {author: null});
    await orm.em.removeAndFlush(BADCOMMENTS);
    const WORSECOMMENTS = await orm.em.find(Kommentar, {receiver: null});
    await orm.em.removeAndFlush(WORSECOMMENTS); */
    
    
    await orm.getMigrator().up();


    const limiter = rateLimit({
        store: new RateLimitStore({
            client: redisClient
        }),
        windowMs: 15 * 60 * 1000,
        max: 100
    });

    app.use("/api/", limiter)


    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true, 
    }));
    app.use(fileupload());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use( express.static("dist/public"));
    app.use([
        "/api/students/upload",
        "/api/students/me-query",
        "/api/comments/upload", 
        "/api/students/login", 
        "/api/students/make-superuser", 
        "/api/students/delete-user", 
        "/api/surveys/create", 
        "/api/surveys/get",
        "/api/surveys/vote",
        "/api/students/update",
        "/api/students/singular"
    ], session({
        store: new RedisStore({client: redisClient, disableTouch: true}),
        name: "qid",
        secret: "fdkjszhflhdfua",
        resave: false,
        cookie: {
            path:"/",
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: false
        }
    }))

    // const what_the_fuck = await orm.em.find(Schueler, {});
    // console.log(what_the_fuck)
    // console.log(await orm.em.find(Option, {}))

    // console.log(await orm.em.find(Schueler, {}))
    app.use("/api/students", StudentRouter(orm));
    app.use("/api/comments", CommentRouter(orm))
    app.use("/api/surveys", SurveyRouter(orm))

    app.get("*", (_, res) => {
        res.sendFile("index.html", {root: path.join(__dirname, "./public")})
    })


    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"

    io.on("connection", socket => {
        console.log("a user connected coggers")
        const { receiverId, authorId } = socket.handshake.query;
        let roomId = "";
        if(receiverId === undefined || authorId === undefined){
            console.log("uh oh")   
        }
        else if(receiverId instanceof Array || authorId instanceof Array){
            console.log("stinky")
        }
        else if(parseInt(receiverId) > parseInt(authorId)){
            roomId = authorId + receiverId;
        }else{
            roomId = receiverId + authorId;
        }
        if(roomId !== ""){
            socket.join(roomId)
        }


        socket.on(NEW_CHAT_MESSAGE_EVENT, msg => {
            console.log(msg)
            io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, msg)
        })

        socket.on("disconnect", () => {
            socket.leave(roomId);
        })
    })
    httpServer.listen(3232)
    // app.listen(3232, () => console.log("listnenjng @ 3434"));
}
main().catch(err => {
    console.error(err)
});
