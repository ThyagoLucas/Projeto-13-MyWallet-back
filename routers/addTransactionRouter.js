import { Router } from "express";
import { postTransaction } from "../controllers/accountMovimentationController.js";
import { validDatasTransaction } from "../middlewares/validTransactionMiddlerware.js";

const transaction = Router();

transaction.post('/movimentation', validDatasTransaction, postTransaction);

export default transaction;