import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatLog from './ChatAppLog/LogingChat';
import ChatHome from './ChatAppLog/ChatHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLog />} />
        <Route path="/chathome" element={<ChatHome />} />
      </Routes>
    </Router>
  );
}

export default App;