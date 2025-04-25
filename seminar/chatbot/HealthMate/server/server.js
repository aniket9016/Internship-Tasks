const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error("OpenAI error:", error.message);
        res.status(500).json({ reply: "Oops! Something went wrong." });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
