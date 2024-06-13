const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getAllTodos);

router.get('/todos/:id', todoController.getTodoById);

router.post('/todos', todoController.createTodo);

router.put('/todos/:id', todoController.updateTodo);

router.put('/todos/status/:id', todoController.updateTodoStatus);

router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
