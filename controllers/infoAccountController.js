import db from "../db.js";

export async function getInfoAccount(req, res){
    const {authorization} = req.headers;
    const token = authorization.replace('Bearer', '').trim();

    try {
        
        const infoSession = await db.collection("sessions").findOne({token:token});
        const nameUser = await db.collection("users").findOne({_id:infoSession.user});
        const movimentations = await db.collection("transactions").find({userID:infoSession.user}).toArray();
        let total = 0;
        movimentations.forEach(transaction =>{
            transaction.typeOperation === 'cashIn'
            ?total = total+transaction.value
            :total = total- transaction.value
        });
        const firstName = nameUser.name.split(' ');
        const response = {name:firstName[0], transactions:movimentations, total:total}
        res.send(response);
        
    } catch (error) {
        console.log("Erro no info account",error);
    }
}
