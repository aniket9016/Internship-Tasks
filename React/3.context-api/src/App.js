import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEdit />} />
            <Route path="/edit/:id" element={<AddEdit />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
