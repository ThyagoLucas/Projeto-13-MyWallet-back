import express from "express";
import cors from 'cors';
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';
import {v4} from 'uuid';
import dayjs from 'dayjs';


const app = express();
dotenv.config();

app.listen(5000, ()=>{
    console.log("Servidor rodando na porta 5000");
});

app.use(cors());
app.use(express.json());
app.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URL);

let db = mongoClient.db(`${process.env.DATA_BASE}`);

mongoClient.connect();

app.post("/cadastro", async (req, res)=>{
    
    const {name, email, password, confPassword} = req.body;

    if(password !== confPassword){
        return res.status(403).send("Senhas e confirmação divergentes");
    }
    
    try {
        
        const user = {name:name.trim(), email:email.toLowerCase().trim(), password:password}
        await db.collection('users').insertOne(user);
        res.status(201).send('cadastrado com sucesso.')
        
    } catch (error) {
        console.log(error);
        
    }
});

app.post("/login", async (req, res) =>{

    const {email, password} = req.body;
    const findUser = await db.collection('users').findOne({email:`${email.toLowerCase()}`});
    if(findUser === null){
        res.status(403).send('Emai  encontrado');
    }
   
    try {

        if(password === findUser.password){
            const token = v4();
            const hour = dayjs().format("HH:mm:ss");

            await db.collection('sessions').insertOne({user:findUser._id, token:token, hour:hour});
            res.status(201).send(token);
        }
        else{
            res.status(403).send('Senha inválida');
        }

    } catch (error) {
        console.log("Erro na linha 65:", error)
        
    }
}); 

app.get("/info-account", async (req,res)=>{

    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    if(token === undefined){
        return res.status(404).send("Authorization não encontrado ou inválido");
    }
    
    try {
        
        const infoSession = await db.collection("sessions").findOne({token:token});
        const nameUser = await db.collection("users").findOne({_id:infoSession.user});
        res.send(nameUser.name);


    } catch (error) {
        
    }
    




})





