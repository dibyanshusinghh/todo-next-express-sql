const Todo = require('../models/Todo');

// Get all Todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Error fetching todos' });
    }
};

// Get a Todo by Id
const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todos = await Todo.findById(id);
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Error fetching todos' });
    }
};

// Create a Todo
const createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = await Todo.create({ title, description });
        res.json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Error creating todo' });
    }
};

// Update a Todo
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, is_completed } = req.body;
    try {
        const [todo] = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.title = title;
        todo.description = description;
        todo.is_completed = is_completed;
        await Todo.update(todo);
        res.json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Error updating todo' });
    }
};

// Delete a Todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await Todo.delete(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Error deleting todo' });
    }
};

// Update a Todo
const updateTodoStatus = async (req, res) => {
    const { id } = req.params;
    const { is_completed } = req.body;
    try {
        const [todo] = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await Todo.updateStatus({id, is_completed: is_completed});
        res.json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Error updating todo' });
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    updateTodoStatus
};
