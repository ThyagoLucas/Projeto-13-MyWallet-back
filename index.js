import express from "express";
import cors from 'cors';

import loginAndRegisterRouter from "./routers/loginAndRegisterRouter.js";
import infoAccountRouter from "./routers/infoAccountRouter.js";
import transaction from "./routers/addTransactionRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, ()=>{
    console.log("Servidor rodando na porta 5000");
});

//routers
app.use(loginAndRegisterRouter);

app.use(infoAccountRouter);

app.use(transaction)
