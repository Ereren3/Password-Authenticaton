const express = require('express');
const PageRoutes = require('./routes/index');
const UserRoutes = require('./routes/user');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);

const PORT = process.env.PORT || 3000;



app.use("/", PageRoutes);
app.use("/users", UserRoutes);

app.listen(PORT,()=>{
    console.log("Server started on port 3000");
})