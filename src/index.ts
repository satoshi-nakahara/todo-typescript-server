import express from 'express';
import { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.get('/allTodos', async (req: Request, res: Response): Promise<void> => {
  try {
    const allTodos = await prisma.todo.findMany();
    res.json(allTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/createTodo', async (req: Request, res: Response): Promise<void> => {
    const { title, isCompleted } = req.body;
    
    try {
        const newTodo = await prisma.todo.create({
          data: {
            title,
            isCompleted,
            },
        });
        res.json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/editTodo/:id', async (req: Request, res: Response): Promise<void> => {

    try { 
        const id  = Number(req.params.id);
        const { title, isCompleted } = req.body;
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                title,
                isCompleted,
            },
        });
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteTodo/:id', async (req: Request, res: Response): Promise<void> => {
    
    try {
        const id = Number(req.params.id);
        const deletedTodo = await prisma.todo.delete({
            where: { id },
        });
        res.json(deletedTodo);
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));