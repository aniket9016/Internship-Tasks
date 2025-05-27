const fastify = require("fastify")({ logger: true });
const PORT = 5005;

fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "fastify-api",
      version: "1.0.0",
    },
  },
  exposeRoute: true,
  routePrefix: "/docs/json",
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
});

fastify.register(require("./routes/items"));

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    fastify.log.info(`Server listening on port ${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
