const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup with dynamic file name check
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const existingPath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(existingPath)) {
      // Block upload of duplicate file
      return cb(new Error("File already exists"));
    }
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Upload endpoint
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

// List files
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

// Download file
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  res.download(filePath);
});

// Delete file
app.delete("/delete/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Error deleting file");
    res.send({ message: "File deleted successfully." });
  });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
