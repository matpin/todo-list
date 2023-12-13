const Todo = require("../models/todoModel");

function todoMapper(oldTodo) {
    return {
        todo: oldTodo.todo,
        completed: oldTodo.completed,
        priority: oldTodo.priority,
        id: oldTodo._id.toString()
    }
}

// Create new todo
const createTodo = async (req, res) => {
    try {
        let todo = req.body;
        let newTodo = await Todo.create(todo);
        let newTodos = todoMapper(newTodo)
        // console.log(newTodos);
        res.send({msg: "New todo created successfully", newTodo: newTodos})
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal server error"});
    }
}

// Get all todos
const getTodos = async (req, res) => {
    try {
        let todos = await Todo.find();
        let allTodos = todos.map(t => todoMapper(t))
        res.status(200).send(allTodos);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal server error"});
    }
}

// Delete a todo
const deleteTodo = async (req, res) => {
    try {
        await Todo.deleteOne({_id: req.params.id});
        res.status(200).send({msg: "Deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal server error, can not deleted"});
    }
}

// Update a todo
const updateTodo = async (req, res) => {
    try {
        console.log(req.body);
        await Todo.updateOne({_id: req.params.id}, req.body);
        res.status(200).send({msg: "Updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal server error, can not updated"});
    }
}

module.exports = {createTodo, getTodos, deleteTodo, updateTodo};