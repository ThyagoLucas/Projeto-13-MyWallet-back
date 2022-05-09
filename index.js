import express from "express";
import cors from 'cors';

import { login, postCadastro } from "./controllers/cadastroController.js";
import { getInfoAccount } from "./controllers/infoAccountController.js";
import { sendTransaction } from "./controllers/AccountMovimentationController.js";

const app = express();

app.listen(5000, ()=>{
    console.log("Servidor rodando na porta 5000");
});

app.use(cors());
app.use(express.json());

app.post("/cadastro", postCadastro);
app.post("/login",  login);

app.get("/info-account", getInfoAccount);

app.post("/movimentation", sendTransaction);