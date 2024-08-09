const express = require('express');
const User = require('../models/user');
const e = require("express");

const router = express.Router();

router.route("/login").get((req, res) => {
    res.render('login');
})

router.route("/register").get((req, res) => {
    res.render('register');
})

router.route("/register").post(async (req, res) => {
    const {password, password2} = req.body;

    if (password !== password2) {
        res.render('register', {
            error: "Passwords dont match",
        });
        return false;
    }

    await User.create(req.body)
        .then(() => {
            res.redirect('login');
        })
        .catch((err)=>{console.log(err)});

})

module.exports = router;