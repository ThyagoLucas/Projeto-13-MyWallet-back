import { Router } from "express";

import { postLogin, postRegister } from "../controllers/loginAndRegisterController.js";
import { registerVerify } from "../middlewares/registerDatasVerifyMiddlerware.js";

const loginAndRegisterRouter = Router();

//Routers
loginAndRegisterRouter.post('/register', registerVerify, postRegister);

loginAndRegisterRouter.post('/login', postLogin);


export default loginAndRegisterRouter;