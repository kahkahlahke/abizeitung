import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Response, Request } from "express";
import { Kommentar } from "../entities/Kommentar";
import { Schueler } from "../entities/Schueler";

export const getComments = (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        const schueler = await em.findOne(Schueler, {_id: req.body.studentId})
        
        const kommentar = await em.find(Kommentar, {receiver: schueler});
        console.log(schueler, kommentar)
        res.send(kommentar);
        em.clear();
    }
}