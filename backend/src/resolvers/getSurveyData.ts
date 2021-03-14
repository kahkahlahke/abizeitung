import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Response, Request } from "express";
import { Option } from "../entities/Option";
import { Umfrage } from "../entities/Umfrage"; 

export const getSurveyData = (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        const umfragen = await em.find(Umfrage, {});
        const optionen = await em.find(Option, {});
        for(let i = 0; i < optionen.length; i++){
            await optionen[i].voters?.init();
        }
        em.clear()
        return res.send({umfragen: umfragen, optionen: optionen});
    }
}