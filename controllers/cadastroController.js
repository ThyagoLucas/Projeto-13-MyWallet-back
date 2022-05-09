import db from "../db.js";


export async function postCadastro(req, res){
    
    const {name, email, password, confPassword} = req.body;
    
    if(password !== confPassword){
        return res.status(403).send("Senhas e confirmação divergentes");
    }
    
    try {
        const user = {name:name.trim(), email:email.toLowerCase().trim(), password:password}
        await db.collection('users').insertOne(user);
        res.status(201).send('cadastrado com sucesso.')
        
    } catch (error) {
        console.log(error);
    }
}


export async function login(req, res){

    const {email, password} = req.body;
    const findUser = await db.collection('users').findOne({email:`${email.toLowerCase()}`});
    if(findUser === null){
        res.status(403).send('Emai  encontrado');
    }
   
    try {

        if(password === findUser.password){
            const token = v4();
            const hour = dayjs().format("HH:mm:ss");

            await db.collection('sessions').insertOne({user:findUser._id, token:token, hour:hour});
            res.status(201).send(token);
        }
        else{
            res.status(403).send('Senha inválida');
        }

    } catch (error) {
        console.log("Erro na linha 65:", error)
        
    }
}