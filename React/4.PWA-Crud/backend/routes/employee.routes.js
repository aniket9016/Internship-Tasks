const path = require("path");
const fs = require("fs");
const Employee = require("../models/employee.model");

const UPLOAD_DIR = path.join(__dirname, "../uploads");

// Ensure uploads folder exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function generateUniqueFilename(baseName) {
  let name = baseName;
  let counter = 1;
  const ext = path.extname(baseName);
  const base = path.basename(baseName, ext);
  while (fs.existsSync(path.join(UPLOAD_DIR, name))) {
    name = `${base}(${counter})${ext}`;
    counter++;
  }
  return name;
}

module.exports = async function routes(fastify, options) {
  // Create employee
  fastify.post("/employees", async (req, reply) => {
    const parts = req.parts();
    const fields = {};
    let profile_image = null;

    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "profile_image") {
        const timePrefix = Date.now();
        const cleanName = `${timePrefix}-${part.filename}`;
        const finalName = generateUniqueFilename(cleanName);
        const filePath = path.join(UPLOAD_DIR, finalName);
        await part.file.pipe(fs.createWriteStream(filePath));
        profile_image = finalName;
      } else if (part.type === "field") {
        fields[part.fieldname] = part.value;
      }
    }

    try {
      const newEmployee = await Employee.create({ ...fields, profile_image });
      reply.code(201).send(newEmployee);
    } catch (err) {
      console.error(err);
      reply.code(500).send({ error: "Failed to create employee" });
    }
  });

  // Get all employees
  fastify.get("/employees", async (req, reply) => {
    const allEmployees = await Employee.findAll();
    reply.send(
      allEmployees.map((emp) => ({
        ...emp.toJSON(),
        image_url: emp.profile_image
          ? `http://localhost:5000/uploads/${emp.profile_image}`
          : null,
      }))
    );
  });

  // Get one employee
  fastify.get("/employees/:id", async (req, reply) => {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return reply.code(404).send({ error: "Employee not found" });
    reply.send(emp);
  });

  // Update employee
  fastify.put("/employees/:id", async (req, reply) => {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return reply.code(404).send({ error: "Employee not found" });

    const parts = req.parts();
    const fields = {};
    let profile_image = emp.profile_image;

    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "profile_image") {
        const timePrefix = Date.now();
        const cleanName = `${timePrefix}-${part.filename}`;
        const finalName = generateUniqueFilename(cleanName);
        const filePath = path.join(UPLOAD_DIR, finalName);
        await part.file.pipe(fs.createWriteStream(filePath));
        profile_image = finalName;
      } else if (part.type === "field") {
        fields[part.fieldname] = part.value;
      }
    }

    await emp.update({ ...fields, profile_image });
    reply.send(emp);
  });

  // Delete employee and remove image from folder
  fastify.delete("/employees/:id", async (req, reply) => {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return reply.code(404).send({ error: "Employee not found" });

    // Delete image file if it exists
    if (emp.profile_image) {
      const imagePath = path.join(UPLOAD_DIR, emp.profile_image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await emp.destroy();
    reply.send({ message: "Employee and image deleted successfully" });
  });
};
