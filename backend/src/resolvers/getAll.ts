import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Response, Request } from "express";
import { Schueler } from "../entities/Schueler";

export const getAllStudents = async (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        const schueler = await em.find(Schueler, {});
        let resp: string | Schueler[];
        if (schueler !== undefined){
            resp = schueler;
        }else{
            resp = "that didn't work"
        }

        res.send(resp);
        em.clear();
    }
}