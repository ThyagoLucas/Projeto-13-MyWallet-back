import db from "../db.js";

export async function getInfoAccount(req, res){

    console.log('Entrou no server')
    const {authorization} = req.headers;
    
    const token = authorization?.replace('Bearer', '').trim();
    if(token === undefined){
        return res.status(404).send("Authorization não encontrado ou inválido");
    }

    try {
        
        const infoSession = await db.collection("sessions").findOne({token:token});
        const nameUser = await db.collection("users").findOne({_id:infoSession.user});
        const movimentations = await db.collection("transactions").find({userID:infoSession.user}).toArray();
        console.log(movimentations);
        let total = 0;
        movimentations.forEach(transaction =>{
            transaction.typeOperation === 'cashIn'
            ?total = total+transaction.value
            :total = total- transaction.value
        });
        const firstName = nameUser.name.split(' ');
        const response = {name:firstName[0], transactions:movimentations, total:total}
        console.log(response);
        res.send(response);
        
    } catch (error) {
        console.log("Heeeeeeeeeeeeeere",error);
    }
}