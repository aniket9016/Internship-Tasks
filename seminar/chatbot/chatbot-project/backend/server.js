require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ChatSchema = new mongoose.Schema({
  userMessage: String,
  botResponse: String,
  timestamp: { type: Date, default: Date.now },
});
const ChatModel = mongoose.model("Chat", ChatSchema);

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const botReply = response.data.choices[0].message.content;
    const chat = new ChatModel({ userMessage: message, botResponse: botReply });
    await chat.save();
    res.json({ reply: botReply });
  } catch (error) {
    res.status(500).json({ error: "Error fetching response" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
