const express = require('express');
const mongoose = require('mongoose');
const DBConnection = require('./config/keys').MongoURI;
const PageRoutes = require('./routes/pageRoutes');
const UserRoutes = require('./routes/userRoutes');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

const app = express();

//Database connection
mongoose.connect(DBConnection)
    .then(()=> {console.log("Connected")})
    .catch(err => console.log(err));


//EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Our routes
app.use("/", PageRoutes);
app.use("/users", UserRoutes);

//Port for the server to listen on
app.listen(PORT,()=>{
    console.log("Server started on port 3000");
})