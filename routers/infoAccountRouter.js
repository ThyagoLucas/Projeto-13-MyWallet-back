import { Router } from "express";
import { getInfoAccount } from "../controllers/infoAccountController.js";
import { tokenVerify } from "../middlewares/tokenVerifyMiddlerware.js";

const infoAccountRouter = Router();

infoAccountRouter.get('/info-account',tokenVerify, getInfoAccount);

export default infoAccountRouter;