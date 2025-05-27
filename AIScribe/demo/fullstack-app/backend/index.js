require("dotenv").config();
const fastify = require("fastify")({ logger: true });

const fastifyCors = require("@fastify/cors");
const fastifyFormbody = require("@fastify/formbody");
const fastifyCookie = require("@fastify/cookie");
const fastifySession = require("@fastify/session");

fastify.register(fastifyCors, {
  origin: ["http://localhost:3000"],
  credentials: true,
});

fastify.register(fastifyFormbody);
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: "a-very-secure-secret-key-for-session",
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60,
  },
  saveUninitialized: false,
});

fastify.get("/", async (request, reply) => {
  return { message: "Welcome to the Fastify API root route" };
});

fastify.get("/api/hello", async (request, reply) => {
  return { message: "Hello from Fastify!" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log("🚀 Fastify running on http://localhost:5000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
