const path = require("path");
const fs = require("fs");
const Employee = require("../models/employee.model");

const UPLOAD_DIR = path.join(__dirname, "../uploads");
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
    try {
      const parts = req.parts();
      const fields = {};
      let profile_image = null;

      for await (const part of parts) {
        if (part.type === "file" && part.fieldname === "profile_image") {
          if (!ALLOWED_MIME_TYPES.includes(part.mimetype)) {
            return reply.code(400).send({ error: "Invalid image format" });
          }
          const cleanName = `${Date.now()}-${part.filename}`;
          const finalName = generateUniqueFilename(cleanName);
          const filePath = path.join(UPLOAD_DIR, finalName);
          await part.file.pipe(fs.createWriteStream(filePath));
          profile_image = finalName;
        } else if (part.type === "field") {
          fields[part.fieldname] = part.value;
        }
      }

      const newEmp = await Employee.create({ ...fields, profile_image });
      reply.code(201).send(newEmp);
    } catch (err) {
      console.error("Error creating employee:", err);
      reply.code(500).send({ error: "Server error while creating employee" });
    }
  });

  // Get all employees
  fastify.get("/employees", async (req, reply) => {
    try {
      const all = await Employee.findAll();
      reply.send(all.map((emp) => ({
        ...emp.toJSON(),
        image_url: emp.profile_image
          ? `http://localhost:5000/uploads/${emp.profile_image}`
          : null,
      })));
    } catch (err) {
      console.error("Error fetching employees:", err);
      reply.code(500).send({ error: "Server error while fetching employees" });
    }
  });

  // Get one employee
  fastify.get("/employees/:id", async (req, reply) => {
    try {
      const emp = await Employee.findByPk(req.params.id);
      if (!emp) return reply.code(404).send({ error: "Employee not found" });

      reply.send({
        ...emp.toJSON(),
        image_url: emp.profile_image
          ? `http://localhost:5000/uploads/${emp.profile_image}`
          : null,
      });
    } catch (err) {
      console.error("Error fetching employee:", err);
      reply.code(500).send({ error: "Server error while fetching employee" });
    }
  });

  // Update employee
  fastify.put("/employees/:id", async (req, reply) => {
    try {
      const emp = await Employee.findByPk(req.params.id);
      if (!emp) return reply.code(404).send({ error: "Employee not found" });

      const parts = req.parts();
      const fields = {};
      let profile_image = emp.profile_image;

      for await (const part of parts) {
        if (part.type === "file" && part.fieldname === "profile_image") {
          if (!ALLOWED_MIME_TYPES.includes(part.mimetype)) {
            return reply.code(400).send({ error: "Invalid image format" });
          }
          const cleanName = `${Date.now()}-${part.filename}`;
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
    } catch (err) {
      console.error("Error updating employee:", err);
      reply.code(500).send({ error: "Server error while updating employee" });
    }
  });

  // Delete employee and image
  fastify.delete("/employees/:id", async (req, reply) => {
    try {
      const emp = await Employee.findByPk(req.params.id);
      if (!emp) return reply.code(404).send({ error: "Employee not found" });

      if (emp.profile_image) {
        const imgPath = path.join(UPLOAD_DIR, emp.profile_image);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }

      await emp.destroy();
      reply.send({ message: "Employee and image deleted" });
    } catch (err) {
      console.error("Error deleting employee:", err);
      reply.code(500).send({ error: "Server error while deleting employee" });
    }
  });
};
