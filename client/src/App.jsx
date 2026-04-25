import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <div className="grid-bg"></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? <Dashboard /> : <Login />
          }
        />
      </Routes>
      </div>
    </Router>
  );
}

export default App;