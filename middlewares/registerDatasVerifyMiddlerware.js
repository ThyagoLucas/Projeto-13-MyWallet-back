import Joi from "joi";
import db from "../db.js";

export async function registerVerify(req, res, next){

    const {name, email, password, confPassword} = req.body;
    const thereIsUser = await db.collection("users").findOne({email:email.toLowerCase()});

    if(thereIsUser !== null){
        return res.status(403).send("Email já cadastrado");
    }

    const schema = Joi.object({
        
        name: Joi.string()
        .required(),

        email:Joi.string()
        .required()
        .email(),

        password: Joi.string()
        .required(),

        confPassword: Joi.string()
        .equal(password)

    });

    const error = schema.validate({name, email, password, confPassword}).error;
    
    if(error !== undefined){

        return res.status(403).send("preencha todos os dados corretamente", error);

    }
    
    next();
}