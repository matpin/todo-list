const express = require("express");
const router = express.Router();
const {createTodo, getTodos, deleteTodo, updateTodo} = require("../controllers/todoController");

// Create router
router.post("/create", createTodo);

// Get router
router.get("/", getTodos);

// Delete router
router.delete("/:id", deleteTodo);

// Update router
router.put("/:id", updateTodo);

module.exports = router;