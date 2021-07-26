const{AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken');
const{SECRET_KEY}=require('../config');


module.exports=(context)=>{
    const autheader = context.req.headers.authorization;
    if(autheader){
        const token = autheader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token,SECRET_KEY);
                return user;
            } catch (error) {
                throw new AuthenticationError('Hatalı Token');
            }
        }else{
            throw new Error('bearer token bulunamadı');
        }
    }else{
        throw new Error('Authorization token Bulunamadı');
    }
}