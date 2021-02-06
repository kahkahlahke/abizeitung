import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import path from "path";
import { Kurs, Schueler } from "../entities/Schueler";
    
export const postUpload = (orm: MikroORM) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();
        
        console.log(req.files)
        if(!req.files){
            console.log("file not  found");
            return res.status(500).send({ msg: "file not found"});
        }

        const imgFile: any = req.files.file;
        console.log(imgFile);
        const dirname = path.join(__dirname, "../")
        imgFile.mv(`${dirname}/public/images/${imgFile.name}`, (err: any) => {
            if(err){
                console.log("Error OwO: ", err);
                return res.status(500).send({msg: "Error OwO"});
            }

            //return res.send({name: imgFile.name, path: `/${imgFile.name}`})
        })
        console.log(req.body)
        const student = em.create(Schueler, {name: req.body.name, description: req.body.desc, image: imgFile.name, kurs: Kurs[req.body.kurs]})
        await em.persistAndFlush(student);
        console.log(student._id)
        req.session!.userId = student._id;
        console.log(req.session.userId)
        em.clear();
        return res.send("ok")
    }   
}
