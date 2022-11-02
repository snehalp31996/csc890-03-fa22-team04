require("dotenv").config();

require("dotenv").config();

// imports modules
const express = require("express");
const cors = require("cors");
const connection = require("./db/db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//app
const app = express();

// database connection
connection();

//middleware

app.use(express.json());
app.use(cors());
// app.use(router);
//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//port
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
