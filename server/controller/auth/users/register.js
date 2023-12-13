const { validationResult } = require("express-validator");
const { findUserByEmail, CreateUser } = require("../../../firebase/user");
const { createJwtById } = require("../../../utils/JwtToken");
const { CreatePasswrodHash } = require("../../../utils/passwordActions");


const createUser = async (req, res, next) => {
    try {
        // validate request 
        const errors = validationResult(req);
        // all params 
        const { email, password, first, last, phone, company } = req.body;

        // invalid credencial send error
        if (errors.errors.length > 0) {
            let response = {
                message: "Form Validation Error.",
                status: 200,
                error: errors.errors
            }
            return res.json(response)
        }

        // find user
        let data = await findUserByEmail(email)
        if (data.length != 0) {
            let response = {
                message: "Email Exist",
                status: 200,
                error: [
                    {
                        type: "field",
                        value: email,
                        msg: "Email is alrady exist enter another email.",
                        path: "email",
                        location: "body"
                    }
                ]
            }
            return res.json(response)
        }

        // create password hash 
        const passwordHash = await CreatePasswrodHash(password);

        // create user on db 
        let CreateUserRes = await CreateUser({ email, password: passwordHash, first, last, phone, company })

        if (CreateUserRes.userId) {
            // create jwt token 
            let JwtToken = createJwtById(CreateUserRes.userId);

            let response = {
                message: "User Created.",
                status: 200,
                data: {
                    msg: "New Use Created Successfully.",
                    token: JwtToken.token
                }
            }

            // last response send jwt token 
            return res.json(response)
        }
    } catch (error) {
        // any erro occer send error 
        return res.json({ message: "Server Error", status: 500 })
    }
}

module.exports = createUser;