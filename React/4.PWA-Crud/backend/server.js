const Fastify = require("fastify");
const path = require("path");
const cors = require("@fastify/cors");
const formbody = require("@fastify/formbody");
const multipart = require("@fastify/multipart");
const fastifyStatic = require("@fastify/static");
const sequelize = require("./db");

const employeeRoutes = require("./routes/employee.routes");
const notificationRoutes = require("./routes/notification.routes"); // ✅ added

const app = Fastify({ logger: true });

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

app.register(formbody);
app.register(multipart);

app.register(fastifyStatic, {
  root: path.join(__dirname, "uploads"),
  prefix: "/uploads/",
});

app.register(employeeRoutes);
app.register(notificationRoutes); // ✅ registered

const start = async () => {
  try {
    await sequelize.sync();
    await app.listen({ port: 5000 });
    console.log("✅ Server running at http://localhost:5000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
