const { findUserById } = require("../firebase/user");
const { findIdByJwt } = require("../utils/JwtToken");

const authUser = async (req, res, next) => {
    // get user token 
    const JwtToken = req.headers.token;
    // find user id by jwt 
    const isValidToken = findIdByJwt(JwtToken);
    const userId = isValidToken.userId;
    const InvlaidUserResponse = {
        message: "Invalid User.",
        valid: false,
        status: 400
    }

    // if token id not found 
    if (userId == null) {
        // return invalid user 
        return res.send(InvlaidUserResponse)
    }


    // check user exist in data base 
    const UserDataServer = await findUserById(userId);

    // if user id not match 
    if (!UserDataServer) {
        // return invalid user 
        return res.send(InvlaidUserResponse)
    }


    // if user not from below  url go to next task 
    if (req.url == "/user") {

        // validate for only /api/validate/user this url 
        const VlaidUserResponse = {
            message: "Valid User.",
            valid: true,
            status: 200
        }

        // return invalid user 
        return res.send(VlaidUserResponse)
    }

    next()
}

module.exports = { authUser }