const JWT = require('jsonwebtoken');

const secret = "$uperman";

function CreateTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        Profileimageurl: user.Profileimageurl,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validatetoken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    CreateTokenForUser,
    validatetoken,
}
