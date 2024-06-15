const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { CreateTokenForUser } = require('../services/authentication');

const Userschema = new Schema({
    Fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    Profileimageurl: {
        type: String,
        default: "/images/profileimage.jpg",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, { timestamps: true });

Userschema.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return;


    const salt = randomBytes(16).toString('hex');
    const hashpass = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashpass;
    next();
});


Userschema.static('matchPasswordAndGenerateToken', async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found");

    const salt = user.salt;
    const hashpass = user.password;

    const userprovidepass = createHmac('sha256', salt).update(password).digest('hex');
    if(hashpass !== userprovidepass) throw new Error("Password not matched");
    
    const token = CreateTokenForUser(user);
    return token;
})
const User = mongoose.model('User', Userschema);
module.exports = User;