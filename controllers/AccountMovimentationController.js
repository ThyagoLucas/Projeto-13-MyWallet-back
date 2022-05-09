import db from "../db.js";
import dayjs from "dayjs";

export async function sendTransaction (req, res){

    const day = dayjs().format('DD');
    const month = dayjs().format('MM');
    const year = dayjs().format('YYYY');

    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer','').trim();

    if(token === undefined){
        return res.status(401).send("cabeçalho da requisição inválido");
    }

    const {type, description, value} = req.body;
    try {
        const infoSession = await db.collection("sessions").findOne({token:token});
        const infoUser = await db.collection("users").findOne({_id:infoSession.user});
        let floatValue = value.replace(',', '.');
        await db.collection("transactions").insertOne({ userID:infoUser._id, day:day, month:month, year:year, typeOperation:type, description:description, value:parseFloat  (floatValue)})
        
        res.status(201).send("cadastrado com sucesso");
 
    } catch (error) {
        console.log("Erro na linha 124", error);
    }


}