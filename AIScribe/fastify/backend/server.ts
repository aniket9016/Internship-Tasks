import Fastify from 'fastify';
import cors from '@fastify/cors';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';

const fastify = Fastify();
await fastify.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'triveni@123', 
  database: 'itemdb'
});

// CREATE
fastify.post('/items', async (req: any, reply) => {
  const id = uuidv4();
  const { name } = req.body;
  await db.execute('INSERT INTO items (id, name) VALUES (?, ?)', [id, name]);
  reply.send({ id, name });
});

// READ
fastify.get('/items', async (_, reply) => {
  const [rows] = await db.query('SELECT * FROM items');
  reply.send(rows);
});

// UPDATE
fastify.put('/items/:id', async (req: any, reply) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.execute('UPDATE items SET name = ? WHERE id = ?', [name, id]);
  reply.send({ id, name });
});

// DELETE
fastify.delete('/items/:id', async (req: any, reply) => {
  const { id } = req.params;
  await db.execute('DELETE FROM items WHERE id = ?', [id]);
  reply.send({ id });
});

fastify.listen({ port: 5005 }, () => {
  console.log('Fastify server running at http://localhost:5005');
});
