import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config"
import { getAllStudents } from "./resolvers/getAll";
import cors from "cors";
import fileupload from "express-fileupload";
import { postUpload } from "./resolvers/postUpload";
import bodyParser from "body-parser";
import session from "express-session";
import { __prod__ } from "./constants";
import { getMe } from "./resolvers/meQuery";
import redis from "redis";
import connectRedis from "connect-redis"
import { getComments } from "./resolvers/getComments";
import { postComment } from "./resolvers/postComment";
import { postLogin } from "./resolvers/postLogin";
import path from "path"
import { postMakeSuperuser } from "./resolvers/makeSuperuser";
import { postDeleteUser } from "./resolvers/postDeleteUser";
import { Kommentar } from "./entities/Kommentar";
import { postMakeSurvey } from "./resolvers/postMakeSurvey";
import { getSurveyData } from "./resolvers/getSurveyData";
import { postVote } from "./resolvers/postVote";
import { postUpdateStudent } from "./resolvers/postUpdateStudent";
import RateLimitStore from "rate-limit-redis";
import rateLimit from "express-rate-limit";

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


    const BADCOMMENTS = await orm.em.find(Kommentar, {author: null});
    await orm.em.removeAndFlush(BADCOMMENTS);
    const WORSECOMMENTS = await orm.em.find(Kommentar, {receiver: null});
    await orm.em.removeAndFlush(WORSECOMMENTS);
    
    
    await orm.getMigrator().up();


    const limiter = rateLimit({
        store: new RateLimitStore({
            client: redisClient
        }),
        windowMs: 15 * 60 *1000,
        max: 100
    });

    app.use("/api/", limiter)


    app.use(cors({
        origin: "http://localhost:5000",
        credentials: true, 
    }));
    app.use(fileupload());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use( express.static("dist/public"));
    app.use([
        "/api/upload",
        "/api/me-query",
        "/api/write-comment", 
        "/api/login", 
        "/api/make-superuser", 
        "/api/delete-student", 
        "/api/make-survey", 
        "/api/get-surveys",
        "/api/vote",
        "/api/updateStudent"
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

    app.get("/api/get-students", getAllStudents(orm));
    app.get("/api/me-query", getMe(orm));
    app.get("/api/get-surveys", getSurveyData(orm));
    app.post("/api/upload", postUpload(orm));
    app.post("/api/write-comment", postComment(orm));
    app.post("/api/login", postLogin(orm));
    app.post("/api/get-comments", getComments(orm));
    app.post("/api/make-superuser", postMakeSuperuser(orm));
    app.post("/api/delete-student", postDeleteUser(orm));
    app.post("/api/make-survey", postMakeSurvey(orm));
    app.post("/api/vote", postVote(orm));
    app.post("/api/updateStudent", postUpdateStudent(orm));

    app.get("*", (_, res) => {
        res.sendFile("index.html", {root: path.join(__dirname, "./public")})
    })
    app.listen(3232, () => console.log("listnenjng @ 3434"));
}
main().catch(err => {
    console.error(err)
});
