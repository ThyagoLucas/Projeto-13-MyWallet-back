import express from "express";
import cors from 'cors';
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.listen(5000, ()=>{
    console.log("Servidor rodando na porta 5000");
});
app.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URL);

let db = mongoClient.db(`${process.env.DATA_BASE}`);

mongoClient.connect();






