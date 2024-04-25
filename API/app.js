const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');

const errorMiddleware = require("./middleware/error");

require("dotenv").config({ path: "./config/config.env" });

// Use cookie-parser middleware
app.use(cookieParser());

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Route Imports
const user = require("./controllers/userController");

app.use("/api/v1", user);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;