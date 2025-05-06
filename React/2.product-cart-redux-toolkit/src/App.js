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

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title="AliBaba.com" />

        <div className="container content mt-4">
          <Routes>
            <Route path="*" element={<NoPage />} />
            <Route path="/" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="counter" element={<Counter />} />
            <Route path="todo" element={<Todo />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
