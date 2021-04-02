import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { Umfrage } from "../entities/Umfrage";
import { Option } from "../entities/Option";
import { MyResponse } from "../utils";
import { Schueler } from "../entities/Schueler";

const SurveyRouter = (orm: MikroORM) => {
    const router = express.Router();
    const thisLocation = "/api/surveys";

    router.get("/get", async (_, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;

        const umfragen = await em.find(Umfrage, {});
        const optionen = await em.find(Option, {});
        for(let i = 0; i < optionen.length; i++){
            await optionen[i].voters?.init();
        }

        resp = {
            data: {umfragen: umfragen, optionen: optionen},
            error: null
        }
        em.clear()
        return res.status(200).send(resp);
    })

    router.post("/create", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;
        
        const submittingStudent = await em.findOne(Schueler, {_id: req.session.userId})
        if(!submittingStudent?.superuser){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/create",
                    errorMessage: "Du hast nicht die Erlaubnis dafür."
                }
            }
            em.clear();
            return res.status(502).send("not permitted")
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
        resp = {
            data: "ok",
            error: null
        }

        em.clear();
        return res.status(200).send(resp)
    })

    router.post("/vote", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;

        const votingStudent = await em.findOne(Schueler, {_id: req.session.userId})
        if(votingStudent === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/vote",
                    errorMessage: "Der Schueler wurde nicht gefunden."
                }
            }
            em.clear()
            return res.status(502).send(resp)
        }


        const option = await em.findOne(Option, {id: req.body.optionId});
        
        if(option === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/vote",
                    errorMessage: "Die Option wurde nicht gefunden."
                }
            }
            em.clear()
            return res.status(502).send(resp);
        }

        if(option.voters === undefined){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/vote",
                    errorMessage: "Ein interner Serverfehler ist aufgetreten."
                }
            }
            em.clear()
            return res.status(502).send(resp)
        }

        if(!option.voters.isInitialized()){
            const notpog = await option.voters.init();
            console.log(notpog)
        }

        if(!votingStudent.options?.isInitialized()){
            await votingStudent.options?.init();
        }
        option.numberOf++;
        option.voters.add(votingStudent);
        await em.persistAndFlush(option);
        resp = {
            data: "ok",
            error: null
        }
        em.clear();
        return res.status(200).send(resp)
    });

    return router;
}

export default SurveyRouter;