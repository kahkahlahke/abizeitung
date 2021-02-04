import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import path from "path";
import { Kurs, Schueler } from "../entities/Schueler";
    
export const postLogin = (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        const student = await em.findOne(Schueler, {name: req.body.name})
        if(student === null){
            return res.send("that student does not exist")
        }
        req.session!.userId = student._id;
        console.log(req.session.userId)
        em.clear();
        return res.send("ok")
    }   
}
