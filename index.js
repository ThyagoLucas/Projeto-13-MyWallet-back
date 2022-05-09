import express, { json } from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import loginAndRegisterRouter from "./routers/loginAndRegisterRouter.js";
import infoAccountRouter from "./routers/infoAccountRouter.js";
import transaction from "./routers/addTransactionRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());



const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});

//routers
app.use(loginAndRegisterRouter);

app.use(infoAccountRouter);

app.use(transaction)
