import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { Kommentar } from "../entities/Kommentar";
import { Kurs, Schueler } from "../entities/Schueler";
import { MyResponse } from "../utils";
import argon2 from "argon2";
import path from "path";

const StudentRouter = (orm: MikroORM) => {
    const router = express.Router();
    const thisLocation = "/api/students";

    router.get("/all", async (_, res) => {
        const em = orm.em.fork();
        const schueler = await em.find(Schueler, {});
        let resp: MyResponse;
        if (schueler !== undefined){
            resp = {
                data: schueler,
                error: null
            }
            res.status(200).send(resp)
        }else{
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/all",
                    errorMessage: "Konnte Schüler nicht laden."
                }
            } 
            res.status(502).send(resp)
        }
        em.clear();
    })

    router.post("/make-superuser", async (req, res) => {
        const em = orm.em.fork();
        const schueler = await em.findOne(Schueler, {_id: req.body.id})
        let resp: MyResponse;
        if(schueler === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/make-superuser",
                    errorMessage: "Schüler wurde nicht gefunden."
                }
            }
            res.status(502).send(resp)

            em.clear();
            return;
        }
        const sprusr = await em.findOne(Schueler, {_id: req.session.userId})
        if(!sprusr?.superuser){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/make-superuser",
                    errorMessage: "Du darfst dies nicht."
                }
            }
            res.status(502).send(resp)
            em.clear();
            return;
        }
        schueler.superuser = true;
        await em.persistAndFlush(schueler);
        resp = {
            data: "ok",
            error: null
        }
        res.status(200).send(resp)
        em.clear();
    })
    router.get("/me-query", async (req, res) => {
        const em = orm.em.fork();
        const schueler = await em.findOne(Schueler, {_id: req.session.userId});
        let resp: MyResponse;
        let status: number;
        if(schueler === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/me-query",
                    errorMessage: "Du bist nicht eingeloggt."
                }
            }
            status = 502;
        }else{
            resp = {
                data: schueler,
                error: null
            }
            status = 200;
        }
        // console.log(schueler)
        res.status(status).send(resp);
        em.clear();
    })
    router.post("/delete-user", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;

        let schueler = await em.findOne(Schueler, {_id: req.body.id})
        const commentsReceived = await em.find(Kommentar, {receiver: schueler});
        const commentsWritten = await em.find(Kommentar, {author: schueler});

        if(commentsReceived !== null){
            await em.removeAndFlush(commentsReceived);
        }
        if(commentsWritten !== null){
            await em.removeAndFlush(commentsWritten);
        }
    
        schueler = await em.findOne(Schueler, {_id: req.body.id})

        if(schueler === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/delete-user",
                    errorMessage: "Schüler wurde nicht gefunden."
                }
            }
            em.clear()
            return res.status(502).send(resp);
        }
        const sprusr = await em.findOne(Schueler, {_id: req.session.userId})
        if(!sprusr?.superuser){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/delete-user",
                    errorMessage: "Du bist dazu nicht autorisiert."
                }
            }
            em.clear()
            return res.status(502).send(resp);
        }
        await em.removeAndFlush(schueler)
        resp = {
            data: "ok",
            error: null
        }
        res.status(200).send(resp)
        em.clear();
    })

    router.post("/login", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;

        const student = await em.findOne(Schueler, {name: req.body.name}, {populate: ["password"]})
        if(student === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/login",
                    errorMessage: "Dieser Schueler existiert nicht."
                }
            }
            em.clear()
            return res.status(502).send(resp)
        }
        console.log(student.password)
        const verify = await argon2.verify(student.password, req.body.password) 
        
        if (!verify){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/login",
                    errorMessage: "Dieses Passwort ist falsch."
                }
            }
            console.log("fjkdshfjkls")
            em.clear()
            return res.status(502).send(resp)
        }
        req.session!.userId = student._id;
        em.clear();
        resp = {
            data: "ok",
            error: null
        }        
        return res.status(200).send(resp)
    })

    router.post("/update", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;

        // console.log(req.files)
        let imgFilename: string | null = null;
        if(req.files){
            const imgFile: any = req.files.file;
            console.log(imgFile);
            const dirname = path.join(__dirname, "../")
            imgFile.mv(`${dirname}/public/images/${imgFile.name}`, (err: any) => {
                if(err){
                    resp = {
                        data: null,
                        error: {
                            location: thisLocation + "/update",
                            errorMessage: "Dein Bild konnte nicht richtig verarbeitet werden."
                        }
                    }
                    em.clear()
                    return res.status(502).send({msg: "Error OwO"});
                }
                
                //return res.send({name: imgFile.name, path: `/${imgFile.name}`})
            })
            imgFilename = imgFile.name;            
        }

        
        // console.log(req.body)
        const hashedPassword = await argon2.hash(req.body.password)
        const student = await em.findOne(Schueler, {_id: req.session.userId});
        if(student === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/update",
                    errorMessage: "Dieser Schueler konnte nicht gefunden werden."
                }
            }
            em.clear()
            return res.status(502).send(resp);
        }
        student.name = req.body.name;
        student.description = req.body.desc;
        student.kurs = Kurs[req.body.kurs];
        student.password = hashedPassword;
        if(imgFilename !== null){
            student.image = imgFilename;
        }
        await em.persistAndFlush(student);
        // console.log(student._id)
        req.session!.userId = student._id;
        // console.log(req.session.userId)
        resp = {
            data: "ok",
            error: null
        }
        em.clear();
        return res.status(200).send(resp)
    })

    router.post("/upload", async (req, res) => {
        const em = orm.em.fork();
        let resp: MyResponse;


        if(!req.files){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/upload",
                    errorMessage: "Deine Datei konnte nicht gefunden werden"
                }
            }
            em.clear()
            return res.status(502).send(resp);
        }

        const imgFile: any = req.files.file;
        console.log(imgFile);
        const dirname = path.join(__dirname, "../")
        imgFile.mv(`${dirname}/public/images/${imgFile.name}`, (err: any) => {
            if(err){
                resp = {
                    data: null,
                    error: {
                        location: thisLocation + "/upload",
                        errorMessage: "Dein Bild konnte nicht richtig verarbeitet werden."
                    }
                }
                em.clear()
                return res.status(502).send(resp);
            }
            
            //return res.send({name: imgFile.name, path: `/${imgFile.name}`})
        })
        // console.log(req.body)
        const hashedPassword = await argon2.hash(req.body.password)
        console.log(req.body)
        const student = em.create(Schueler, {
            name: req.body.name, 
            description: req.body.desc, 
            image: imgFile.name, 
            kurs: Kurs[req.body.kurs],
            password: hashedPassword
        })
        await em.persistAndFlush(student);
        console.log(student._id)
        req.session!.userId = student._id;
        console.log(req.session.userId)
        em.clear();
        resp = {
            data: "ok",
            error: null
        }
        return res.status(200).send(resp)
    })

    router.post("/singular", async (req, res) => {
        const em = orm.em.fork();
        const schueler = await em.findOne(Schueler, {_id: req.body.studentId});
        let resp: MyResponse;
        let status: number;
        if(schueler === null){
            resp = {
                data: null,
                error: {
                    location: thisLocation + "/singular",
                    errorMessage: "Dieser Schueler existiert nicht."
                }
            }
            status = 502;
        }
        else{
            resp = {
                data: schueler,
                error: null
            }
            status = 200;
        }
        res.status(status).send(resp);
        em.clear();
    })

    return router;
}

export default StudentRouter;