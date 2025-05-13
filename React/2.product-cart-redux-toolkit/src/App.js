import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Counter from "./components/Counter";
import Todo from "./components/Todo";
import Student from "./components/Student";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Department from "./components/Department";
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title="AliBaba.com" />

        <div className="container content mt-4">
          <Routes>
            <Route path="*" element={<NoPage />} />
            <Route path="/" element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="counter" element={<Counter />} />
            <Route path="todo" element={<Todo />} />
            <Route path="student" element={<Student />} />
            <Route path="register" element={<Register />} />
            <Route
              path="department"
              element={
                <PrivateRoute>
                  <Department />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
