const { validationResult } = require("express-validator");
const { findUserByEmail } = require("../../firebase/user");
const { ValidatePasswrodHash } = require("../../utils/passwordActions");
const { createJwtById } = require("../../utils/JwtToken");

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    // error response 
    let passwordAndEmailError = {
        message: "Invalid Authentication",
        status: 200,
        error: [
            {
                type: "field",
                value: email,
                msg: "Email Don't Exist",
                path: "email",
                location: "body"
            },
            {
                type: "field",
                value: null,
                msg: "Password Don't Exist",
                path: "password",
                location: "body"
            }
        ]
    }

    // is user invalid send response 
    if (errors.errors.length > 0) {
        return res.json(passwordAndEmailError)
    }

    // find user by email 
    let userEmail = await findUserByEmail(email)

    // if you not exist send error response
    if (userEmail.length == 0) {
        return res.json(passwordAndEmailError)
    }

    // validate hash and user password 
    const isValidPassword = await ValidatePasswrodHash(password, userEmail.password)
    
    // invalid password send error
    if(!isValidPassword){
        return res.json(passwordAndEmailError)
    }

    const JwtToken = await createJwtById(userEmail.userId)
    
    let LoginSuccessResponse = {
        message: "User Logindin.",
        status: 200,
        data: {
            msg: "Use Login Successfully.",
            token: JwtToken.token
        }
    }

    // last response send jwt token 
    return res.json(LoginSuccessResponse)
}

module.exports = loginUser;
