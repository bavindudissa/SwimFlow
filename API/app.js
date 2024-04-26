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
const goal = require("./controllers/goalController");
const explorer = require("./controllers/explorerController");

app.use("/api/v1", user);
app.use("/api/v1", goal);
app.use("/api/v1", explorer);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;