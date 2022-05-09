export async function validDatasTransaction(req, res, next){

    const {authorization} = req.headers;
    const {type, description, value} = req.body;

    const token = authorization?.replace('Bearer', '').trim();

    console.log(token, type, description, value);

    if(token === undefined){
        return res.status(403).send('sessão expirou, refassa seu login');
    }
    if(value === 0){
        return res.status(403).send('Valor não pode ser igual a zero');
    }
    if(description === ''){
        return res.status(403).send('Descrição não pode ser vazia');
    }

    next()

}