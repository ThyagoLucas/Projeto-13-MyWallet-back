import db from "../db.js";
import dayjs from "dayjs";

export async function postTransaction (req, res){

    const day = dayjs().format('DD');
    const month = dayjs().format('MM');
    const year = dayjs().format('YYYY');
    
    const {authorization} = req.headers;
    const token = authorization.replace('Bearer','').trim();

    const {type, description, value} = req.body;
    try {
        const infoSession = await db.collection("sessions").findOne({token:token});
        const infoUser = await db.collection("users").findOne({_id:infoSession.user});
        let floatValue = value.replace(',', '.');
        await db.collection("transactions").insertOne({ userID:infoUser._id, day:day, month:month, year:year, typeOperation:type, description:description, value:parseFloat  (floatValue)})
        
        res.sendStatus(201);
 
    } catch (error) {
        console.log(error);
    }


}