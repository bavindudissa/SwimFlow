const express = require("express");
const router = express.Router();
const {
    createExplorer,
    updateExplorer,
    deleteExplorer,
    getExplorerList,
    getExplorerById
} = require("../services/explorerService"); // Adjust the path if needed

// Define your routes and associate them with the appropriate route handler functions
router.post("/explorers", createExplorer); // Endpoint for creating a module
router.put("/explorers/:id", updateExplorer); // Endpoint for updating a module
router.delete("/explorers/:id", deleteExplorer); // Endpoint for deleting a module
router.get("/explorers/list", getExplorerList); // Endpoint for getting module list
router.get("/explorers/:id", getExplorerById); // Endpoint for getting module by ID

module.exports = router;