const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  content: String,
});

module.exports = mongoose.model("File", fileSchema);
