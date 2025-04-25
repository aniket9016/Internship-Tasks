import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Counter from './Components/Counter';
import Todo from './Components/Todo';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import NoPage from './Components/NoPage';
import FetchApi from './Components/FetchApi';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="content container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fetchapi" element={<FetchApi />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
