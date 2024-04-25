const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  updateUser,
  getUserList,
  getUserById
} = require("../services/userService"); // Adjust the path if needed

// Define your routes and associate them with the appropriate route handler functions
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logout);
router.put("/user/:id", updateUser); // Endpoint for updating user
router.get("/user/", getUserList); // Endpoint for getting user list
router.get("/user/:id", getUserById); // Endpoint for getting user by ID

module.exports = router;
