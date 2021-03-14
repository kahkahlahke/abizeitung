import { MikroORM, wrap } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import { Kommentar } from "../entities/Kommentar";
import { Schueler } from "../entities/Schueler";
    
export const postMakeSuperuser = (orm: MikroORM) => {
    return async (req: Request, res: Response, _: NextFunction) => {
        const em = orm.em.fork();
        const schueler = await em.findOne(Schueler, {_id: req.body.id})
        if(schueler === null){
            return res.send("student not foumd OwO");
        }
        const sprusr = await em.findOne(Schueler, {_id: req.session.userId})
        if(!sprusr?.superuser){
            return res.send("you are not permitted")
        }
        schueler.superuser = true;
        await em.persistAndFlush(schueler);
        // console.log("pog")
        em.clear();
        return res.redirect("back")
    }
}
