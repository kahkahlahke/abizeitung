import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Response, Request } from "express";
import { Schueler } from "../entities/Schueler";

export const getMe = (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        console.log(req.session.userId)
        const schueler = await em.findOne(Schueler, {_id: req.session.userId});
        let resp: null | Schueler;
        resp = schueler
        // console.log(schueler)
        res.send(resp);
        em.clear();
    }
}