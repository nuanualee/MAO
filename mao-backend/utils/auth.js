const jwt = require('jsonwebtoken');

function generateToken(userInfo){
    if (!userInfo){
        // if user is not defined, return null
        return null;
    }

    // const userInfo = {
    //     username: user.username,
    //     email: user.email
    // };

    // pass in secret for token + environment var in lambda function
    return jwt.sign(userInfo, process.env.JWT_SECRET,{
        expiresIn: "1h"
    });
}

function verifyToken(username, token){
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        // error, return verify = false
        if (error) {
            return{
                verified: false,
                message: "invalid token"
            }
        }
        // username not equals to intended useranem, return verify = false
        if (response.username !== username){
            return{
                verified: false,
                message: "invalid user"
            }
        }

        // if successful
        return{
            verified: true,
            message: "verified"
        }
    });
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;