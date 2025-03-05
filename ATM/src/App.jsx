import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/pages/Home";
import Compare from "../src/components/pages/Compare";
import About from "../src/components/pages/About";
import Login from "../src/components/pages/Login";
import Footer from "../src/components/Footer";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
