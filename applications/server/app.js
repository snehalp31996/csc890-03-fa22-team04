require('dotenv').config();

// imports modules
const express = require('express');
const cors = require('cors');
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const morgan = require('morgan');


//app
const app = express();


// database connection
connection();

//middleware

// app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

//routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

//port 
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, ()=> console.log(`Server is running on port ${port}`))