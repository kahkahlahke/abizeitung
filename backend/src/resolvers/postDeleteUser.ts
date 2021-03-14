import { MikroORM, wrap } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import { Kommentar } from "../entities/Kommentar";
import { Schueler } from "../entities/Schueler";
    
export const postDeleteUser = (orm: MikroORM) => {
    return async (req: Request, res: Response, _: NextFunction) => {
        const em = orm.em.fork();

        const schueler = await em.findOne(Schueler, {_id: req.body.id})
        const commentsReceived = await em.find(Kommentar, {receiver: schueler});
        const commentsWritten = await em.find(Kommentar, {author: schueler});

        if(commentsReceived !== null){
            await em.removeAndFlush(commentsReceived);
        }
        if(commentsWritten !== null){
            await em.removeAndFlush(commentsWritten);
        }
    
        let yepCock = await em.findOne(Schueler, {_id: req.body.id})

        console.log(yepCock, commentsReceived, commentsWritten)
        if(yepCock === null){
            return res.send("student not foumd OwO");
        }
        const sprusr = await em.findOne(Schueler, {_id: req.session.userId})
        if(!sprusr?.superuser){
            return res.send("you are not permitted")
        }
        await em.removeAndFlush(yepCock).catch(err => {
            console.log(err)
        });
        console.log("pog")
        em.clear();
        return res.redirect("back")
    }
}
