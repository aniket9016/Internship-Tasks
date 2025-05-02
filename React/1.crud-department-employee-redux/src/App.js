import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import DepartmentCrud from "./components/DepartmentCrud";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";
import Home from "./components/Home";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import EmployeeCrud from "./components/EmployeeCrud";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title="Dept‑Emp CRUD" />

        <div className="container content mt-4">
          <Routes>
            <Route
              path="department"
              element={
                <DepartmentCrud theme={theme} toggleTheme={toggleTheme} />
              }
            />
            <Route
              path="employee"
              element={<EmployeeCrud theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route path="*" element={<NoPage />} />
            <Route
              path="/"
              element={<Home theme={theme} toggleTheme={toggleTheme} />}
            />
          </Routes>
        </div>

        <Button
          variant={theme === "dark" ? "outline-light" : "outline-dark"}
          onClick={toggleTheme}
          style={{
            position: "fixed",
            bottom: "70px",
            right: "30px",
            borderRadius: "50%",
            padding: "12px",
            width: "50px",
            height: "50px",
            zIndex: 1000,
            borderColor: theme === "dark" ? "#ffffff" : "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            icon={theme === "dark" ? faSun : faMoon}
            style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
          />
        </Button>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
