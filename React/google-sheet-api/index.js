require("dotenv").config();
const express = require("express");
const {  updateSheetData } = require("./googleSheet");

const app = express();
app.use(express.json());

app.put("/sheet", async (req, res) => {
  try {
    const { spreadsheetId, range, values } = req.body;

    if (!spreadsheetId || !range || !values) {
      return res.status(400).json({ status: false, error: "spreadsheetId, range, and values are required in body" });
    }

    const result = await updateSheetData(spreadsheetId, range, values);
    res.json({ status: true, result });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
