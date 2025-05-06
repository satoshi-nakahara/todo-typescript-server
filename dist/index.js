"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient();
app.get('/allTodos', async (req, res) => {
    try {
        const allTodos = await prisma.todo.findMany();
        res.json(allTodos);
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/createTodo', async (req, res) => {
    const { title, isCompleted } = req.body;
    try {
        const newTodo = await prisma.todo.create({
            data: {
                title,
                isCompleted,
            },
        });
        res.json(newTodo);
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.put('/editTodo/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, isCompleted } = req.body;
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                title,
                isCompleted,
            },
        });
        res.json(updatedTodo);
    }
    catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/deleteTodo/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deletedTodo = await prisma.todo.delete({
            where: { id },
        });
        res.json(deletedTodo);
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
