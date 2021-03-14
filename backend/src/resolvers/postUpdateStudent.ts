import { MikroORM } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import path from "path";
import { Kurs, Schueler } from "../entities/Schueler";
import argon2 from "argon2";
    
export const postUpdateStudent = (orm: MikroORM) => {
    return async (req: Request, res: Response, _: NextFunction) => {
        const em = orm.em.fork();
        
        // console.log(req.files)
        let imgFilename: string | null = null;
        if(req.files){
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
            imgFilename = imgFile.name;            
        }

        
        // console.log(req.body)
        const hashedPassword = await argon2.hash(req.body.password)
        const student = await em.findOne(Schueler, {_id: req.session.userId});
        if(student === null){
            return res.status(400).send({errorMessage: "something went very wrong...."});
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
        em.clear();
        return res.redirect("/")
    }   
}
