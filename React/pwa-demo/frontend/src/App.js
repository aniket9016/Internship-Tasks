import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Button, Snackbar,
  Alert, List, ListItem, ListItemText, IconButton, Stack
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const API_BASE = "http://localhost:5000";

const FileList = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/files`);
      setFiles(res.data);
    } catch {
      showToast("Failed to load files", "error");
    }
  };

  const showToast = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const resetFileInput = () => {
    setFile(null);
    document.getElementById("file-input").value = "";
  };

  const handleUpload = async () => {
    if (!file) return showToast("Please choose a file first", "warning");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE}/upload`, formData);
      showToast("File uploaded successfully!");
      resetFileInput();
      fetchFiles();
    } catch (err) {
      if (err?.response?.status === 409) {
        showToast("A file with this name already exists.", "error");
      } else {
        showToast("Upload failed", "error");
      }
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`${API_BASE}/delete/${filename}`);
      showToast("File deleted");
      fetchFiles();
    } catch {
      showToast("Failed to delete file", "error");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom color="primary">
        PWA File Uploader
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3} flexWrap="wrap">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
            Choose File
          </Button>
        </label>
        <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
          {file?.name || "No file chosen"}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Uploaded Files
      </Typography>
      {files.length === 0 ? (
        <Typography>No files uploaded yet.</Typography>
      ) : (
        <List>
          {files.map(({ name, viewUrl, downloadUrl }) => (
            <ListItem
              key={name}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <IconButton component={Link} to={`/preview/${name}`} title="View File">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton href={downloadUrl} title="Download File">
                    <DownloadIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(name)} title="Delete File" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const FilePreview = () => {
  const { filename } = useParams();
  const fileUrl = `${API_BASE}/uploads/${filename}`;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>Preview: {filename}</Typography>
      <Box mt={2}>
        <iframe
          src={fileUrl}
          width="100%"
          height="600px"
          style={{ border: "1px solid #ccc" }}
          title="File Preview"
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" component={Link} to="/" color="primary">Back</Button>
      </Box>
    </Container>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileList />} />
        <Route path="/preview/:filename" element={<FilePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
