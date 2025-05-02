import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:5000/api/upload", formData);
    alert("File uploaded!");
  };

  const askQuestion = async () => {
    const res = await axios.post("http://localhost:5000/api/ask", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Ask a Question</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "300px" }}
      />
      <button onClick={askQuestion}>Ask</button>

      <h3>Answer:</h3>
      <p>{answer}</p>
    </div>
  );
}

export default App;
