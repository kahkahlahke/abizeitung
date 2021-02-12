import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import {  Schueler } from "../entities/Schueler";
import argon2 from "argon2";
    
export const postLogin = (orm: MikroORM) => {
    return async (req: Request, res: Response, _: NextFunction) => {
        const em = orm.em.fork();
        const student = await em.findOne(Schueler, {name: req.body.name})
        if(student === null){
            return res.send("that student does not exist")
        }
        const verify = await argon2.verify(student.password, req.body.password) 
        
        if (!verify){
            return res.send("that student does not exist") 
        }
        req.session!.userId = student._id;
        em.clear();
        return res.send("ok")
    }   
}
