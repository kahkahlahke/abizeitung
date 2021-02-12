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
    await orm.getMigrator().up();
    app.use(cors({
        origin: "http://localhost:5000",
        credentials: true, 
    }));
    app.use(fileupload());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use( express.static("dist/public"));
    app.use(["/api/upload", "/api/me-query", "/api/write-comment", "/api/login", "/api/make-superuser", "/api/delete-student"], session({
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
    
    app.get("/api/get-students", getAllStudents(orm));
    app.get("/api/me-query", getMe(orm))
    app.post("/api/upload", postUpload(orm));
    app.post("/api/write-comment", postComment(orm));
    app.post("/api/login", postLogin(orm));
    app.post("/api/get-comments", getComments(orm));
    app.post("/api/make-superuser", postMakeSuperuser(orm));
    app.post("/api/delete-student", postDeleteUser(orm));
    app.get("*", (_, res) => {
        res.sendFile("index.html", {root: path.join(__dirname, "./public")})
    })
    app.listen(3232, () => console.log("listnenjng @ 3434"));
}
main().catch(err => {
    console.error(err)
});
