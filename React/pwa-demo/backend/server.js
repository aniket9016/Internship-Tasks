const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(uploadDir)); // Important

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const existingPath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(existingPath)) {
      return cb(new Error("File already exists"));
    }
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err.message === "File already exists") {
        return res.status(409).json({ error: "A file with the same name already exists." });
      }
      return res.status(500).json({ error: "File upload failed." });
    }

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ message: "File uploaded successfully!", fileUrl });
  });
});

app.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send("Unable to scan files");
    const fileList = files.map((file) => ({
      name: file,
      viewUrl: `http://localhost:5000/uploads/${file}`,
      downloadUrl: `http://localhost:5000/download/${file}`,
    }));
    res.json(fileList);
  });
});

app.get("/download/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  res.download(filePath);
});

app.delete("/delete/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Error deleting file");
    res.send({ message: "File deleted successfully." });
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
