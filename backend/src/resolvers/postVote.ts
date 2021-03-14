import { Collection, MikroORM } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import { Umfrage } from "../entities/Umfrage";
import { Option } from "../entities/Option";
import { Schueler } from "../entities/Schueler";
    
export const postVote = (orm: MikroORM) => {
    return async (req: Request, res: Response, _: NextFunction) => {
        const em = orm.em.fork();
        

        const votingStudent = await em.findOne(Schueler, {_id: req.session.userId})
        if(votingStudent === null){
            return res.status(400).send({message: "user not found"})
        }


        const option = await em.findOne(Option, {id: req.body.optionId});
        
        if(option === null){
            return res.status(400).send({message: "option not found"})
        }

        if(option.voters === undefined){
            return res.status(400).send({message: "option.voters undefined sadge"})
        }

        if(!option.voters.isInitialized()){
            const notpog = await option.voters.init();
            console.log(notpog)
        }

        if(!votingStudent.options?.isInitialized()){
            await votingStudent.options?.init();
        }

        // option.voters.hydrate([votingStudent]);
        option.numberOf++;
        option.voters.add(votingStudent);
        // console.log(option.voters.contains(votingStudent));
        // console.log(await option.voters.loadItems())
        await em.persistAndFlush(option);
        em.clear();
        return res.send({message: "Success"})
    }   
}
