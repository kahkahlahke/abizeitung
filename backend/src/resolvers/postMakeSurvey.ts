import { Collection, MikroORM } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import { Umfrage } from "../entities/Umfrage";
import { Option } from "../entities/Option";
import { Schueler } from "../entities/Schueler";
    
export const postMakeSurvey = (orm: MikroORM) => {
    return async (req: Request, res: Response, _: NextFunction) => {
        const em = orm.em.fork();
        
        const submittingStudent = await em.findOne(Schueler, {_id: req.session.userId})
        if(!submittingStudent?.superuser){
            return res.status(400).send("not permitted")
        }

        const umfrage = em.create(Umfrage, {title: req.body.title});
        let options = Array<Option>();
        for(let i = 0; i < req.body.options.length; i++){
            options.push(em.create(Option, {title: req.body.options[i], umfrage: umfrage, numberOf: 0, voters: []}));
        }
        


        await em.persistAndFlush(umfrage);

        for(let i = 0; i < options.length; i++){
            await em.persistAndFlush(options[i]).catch(err => console.error(err));
        }

        em.clear();
        return res.send({message: "Success"})
    }   
}
