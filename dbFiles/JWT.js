const {sign, verify} = require('jsonwebtoken');


const createTokens = (user) =>{
    const accessToken = sign(
        {name: user.name, id: user.id},
        process.env.JWT_TOKEN_SECRET
    );

    return accessToken;
}

const validateToken = (req, res, next) =>{

    const accessToken = req.cookies["access-token"];

    if(!accessToken){return res.status(400).json({error: "user not authenticated"})}

    try{
        const validToken = verify(
            accessToken,
            process.env.JWT_TOKEN_SECRET
        )
        if(validToken){
            req.authenticated =true;
            return next();
        }
    }catch(err){
        return res.status(400).json({error: err});
    }

}



module.exports = {createTokens, validateToken}