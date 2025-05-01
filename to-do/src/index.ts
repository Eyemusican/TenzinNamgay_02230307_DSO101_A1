// app/src/index.ts
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { PrismaClient } from '@prisma/client';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();
const prisma = new PrismaClient();

app.use('/*', cors());

app.get('/', (c) => c.json({ message: 'Todo API running!' }));

app.get('/api/todos', async (c) => {
  const todos = await prisma.todo.findMany();
  return c.json(todos);
});

app.post('/api/todos', async (c) => {
  const { title } = await c.req.json();
  const todo = await prisma.todo.create({
    data: { title },
  });
  return c.json(todo);
});

app.patch('/api/todos/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await c.req.json();
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data,
  });
  return c.json(updatedTodo);
});

app.put('/api/todos/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await c.req.json();
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data,
  });
  return c.json(updatedTodo);
});

app.delete('/api/todos/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await prisma.todo.delete({
    where: { id },
  });
  return c.json({ message: 'Todo deleted' });
});

const port = Number(process.env.PORT) || 5000;
serve({ fetch: app.fetch, port }, () => {
  console.log(JSON.stringify({
    status: '✅ Server started',
    port,
    message: 'Todo API running!',
  }));
});