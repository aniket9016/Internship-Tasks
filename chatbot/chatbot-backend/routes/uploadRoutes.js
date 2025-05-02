const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const File = require("../models/File");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  let text = "";

  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    text = pdfData.text;
  } else if (file.mimetype === "text/plain") {
    text = fs.readFileSync(file.path, "utf8");
  } else {
    return res.status(400).send("Only PDF and TXT files are supported.");
  }

  const newFile = new File({
    filename: file.originalname,
    content: text,
  });

  await newFile.save();
  res.send("File uploaded and saved.");
});

router.post("/ask", async (req, res) => {
  const { question } = req.body;
  const files = await File.find();

  for (const file of files) {
    if (file.content.toLowerCase().includes(question.toLowerCase())) {
      return res.json({ answer: file.content.substring(0, 300) });
    }
  }

  res.json({ answer: "Sorry, I couldn't find anything." });
});

module.exports = router;
