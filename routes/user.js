const { Router } = require("express");
const express = require("express");
const User = require('../models/user');


const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/signin',(req,res) => {
    return res.render("signin");
});

router.get('/signup',(req,res) => {
    return res.render("signup");
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try{
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
    
        return res.cookie("token",token).redirect('/');
    }
    catch(error){
        return res.render('signin', {
            error: 'Incorrect email or password',
        });
    }
});

router.get('/logout', (req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
})

router.post('/signup', async (req, res) => {
    console.log("Received POST request to /signup"); 
        console.log("Request body:", req.body); 
    const { Fullname, email, password } = req.body;
    await User.create({ Fullname, email, password })
        .then(() => res.redirect('/'))
        .catch(error => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});


module.exports = router;