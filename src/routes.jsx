import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ATMs from "./pages/ATMs";
import Banks from "./pages/Banks";  // Import Banks Page
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atms" element={<ATMs />} />
        <Route path="/banks" element={<Banks />} />  {/* New Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
