import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import path from "path";
import { Kommentar } from "../entities/Kommentar";
import { Kurs, Schueler } from "../entities/Schueler";
    
export const postComment = (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        
        console.log(req.session!.userId)
        const author = await em.findOne(Schueler, {_id: req.session.userId})
        const receiver = await em.findOne(Schueler, {_id: req.body.receiverId})
        const comment = em.create(Kommentar, {content: req.body.desc, author: author, receiver: receiver})
        await em.persistAndFlush(comment);
        em.clear();
        return res.redirect("back")
    }   
}
