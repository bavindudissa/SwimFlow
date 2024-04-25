const express = require("express");
const router = express.Router();
const {
    createGoal,
    updateGoal,
    deleteGoal,
    getGoalList,
    getGoalById
} = require("../services/goalService"); // Adjust the path if needed

// Define your routes and associate them with the appropriate route handler functions
router.post("/goal", createGoal); // Endpoint for creating a module
router.put("/goal/:id", updateGoal); // Endpoint for updating a module
router.delete("/goal/:id", deleteGoal); // Endpoint for deleting a module
router.get("/goal/:id", getGoalList); // Endpoint for getting module list
router.get("/goal/:id", getGoalById); // Endpoint for getting module by ID

module.exports = router;