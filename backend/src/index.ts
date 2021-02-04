import express, { NextFunction, Request, Response } from "express";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config"
import { Schueler } from "./entities/Schueler";
import {Kurs} from "./entities/Schueler";
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
import { getOneStudent } from "./resolvers/getSingular";
import { getComments } from "./resolvers/getComments";
import { postComment } from "./resolvers/postComment";
import { postLogin } from "./resolvers/postLogin";


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
    app.use(express.static("dist/public"));
    app.use(["/upload", "/me-query", "/write-comment", "/login"], session({
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

    app.get("/get-students", await getAllStudents(orm));
    app.get("/me-query", getMe(orm))
    app.post("/upload", postUpload(orm));
    app.post("/get-one-student", getOneStudent(orm));
    app.post("/write-comment", postComment(orm));
    app.post("/login", postLogin(orm));
    app.post("/get-comments", getComments(orm));
    app.listen(3232, () => console.log("listnenjng @ 3434"));
}
main().catch(err => {
    console.error(err)
});
