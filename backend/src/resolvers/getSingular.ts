import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Response, Request } from "express";
import { Schueler } from "../entities/Schueler";

export const getOneStudent = (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        const schueler = await em.findOne(Schueler, {_id: req.body.studentId});
        let resp: null | Schueler;
        resp = schueler
        console.log(schueler)
        res.send(resp);
        em.clear();
    }
}