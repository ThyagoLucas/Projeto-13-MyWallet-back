
export async function tokenVerify (req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    
    if(token === undefined){
        return res.status(404).send("Token não encontrado ou inválido");
    }
    next();
}