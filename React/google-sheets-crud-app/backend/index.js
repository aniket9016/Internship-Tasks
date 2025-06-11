
const express = require("express");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

app.get("/auth-url", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
  res.send({ url: authUrl });
});

app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.redirect(`http://localhost:3000?token=${tokens.access_token}`);
});

app.post("/create-folder-and-sheet", async (req, res) => {
  const { accessToken } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const folder = await drive.files.create({
    requestBody: {
      name: "MyAppFolder",
      mimeType: "application/vnd.google-apps.folder",
    },
  });

  const sheet = await drive.files.create({
    requestBody: {
      name: "MyDataSheet",
      mimeType: "application/vnd.google-apps.spreadsheet",
      parents: [folder.data.id],
    },
  });

  res.send({ folderId: folder.data.id, sheetId: sheet.data.id });
});

app.post("/sheet/insert", async (req, res) => {
  const { accessToken, sheetId, values } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });

  res.send({ status: "Inserted" });
});

app.post("/sheet/read", async (req, res) => {
  const { accessToken, sheetId } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1",
  });

  res.send(result.data);
});

app.post("/sheet/update", async (req, res) => {
  const { accessToken, sheetId, range, values } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: range,
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });

  res.send({ status: "Updated" });
});

app.post("/sheet/delete", async (req, res) => {
  const { accessToken, sheetId, range } = req.body;
  oauth2Client.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });
  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: range,
  });

  res.send({ status: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
