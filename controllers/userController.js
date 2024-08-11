const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require('passport');

exports.getRegisterPage = (req, res) => {
    res.render("register");
}

exports.getLoginPage = (req, res) => {
    res.render("login");
}

exports.createUser = async (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push("Please fill all fields.");
    }

    if (password !== password2) {
        errors.push("Passwords do not match");
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }

    if (errors.length > 0) {
        res.render("register", {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        });
        return false;
    } else {
        User.findOne({email: email})
            .then((user) => {
                if (user) {
                    errors.push("Email already exists");
                    res.render("register", {
                        errors
                    })
                } else {
                    bcrypt.hash(password, 10).then(async (hash) => {
                        await User.create({...req.body, password: hash})
                            .then(() => {
                                res.render("login", {
                                    success: true
                                })
                            })
                            .catch((err) =>
                                console.log(err)
                            );
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }
}

exports.loginUser = async (req, res, next) => {
    passport.authenticate("local",{
        successRedirect: "/dashboard",
        failureRedirect: "/users/login"
    })(req, res, next);
}

exports.logoutUser = async (req, res, next) => {
    req.logout();
    res.redirect("login");
}