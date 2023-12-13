const jwt = require('jsonwebtoken');
const SecretKey = process.env.SecretKey;


const createJwtById = (userId) => {
    try {
        let JwtToken = jwt.sign({ id: userId }, SecretKey,  { expiresIn: '3m' }); //3 months

        // return jwt token 
        return { token: JwtToken };
    } catch (error) {
        return { token: null };
    }
}

module.exports = { createJwtById }