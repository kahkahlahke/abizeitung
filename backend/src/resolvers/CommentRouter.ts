import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { Kommentar } from "../entities/Kommentar";
import { Schueler } from "../entities/Schueler";
import { MyResponse } from "../utils";

const CommentRouter = (orm: MikroORM) => {
    const router = express.Router();
    const thisLocation = "/api/comments";

    router.post("/get", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;
        const schueler = await em.findOne(Schueler, {_id: req.body.studentId})
        if(schueler === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/get",
                    errorMessage: "Dieser Schueler konnte nicht gefunden werden."
                }
            }
            em.clear()
            return res.status(502).send(resp);
        }
        const kommentar = await em.find(Kommentar, {receiver: schueler});
        resp = {
            data: kommentar,
            error: null
        }
        res.status(200).send(resp);
        em.clear();
    })

    router.post("/upload", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;

        const author = await em.findOne(Schueler, {_id: req.session.userId})
        const receiver = await em.findOne(Schueler, {_id: req.body.receiverId})
        
        if(author === null || receiver === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/upload",
                    errorMessage: "Die angegebenen Schueler konnten nicht gefunden werden."
                }
            }

            em.clear();
            return res.status(502).send(resp)
        }

        const comment = em.create(Kommentar, {content: req.body.desc, author: author, receiver: receiver})
        await em.persistAndFlush(comment);
        em.clear();
        resp = {
            data: "ok",
            error: null
        }
        return res.status(200).send(resp)
    })

    return router;
}

export default CommentRouter;