import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Components
import Navbar from "../src/User/Navbar";
import Footer from "../src/User/Footer";
import Home from "../src/User/pages/Home";
import Banks from "../src/User/pages/Banks";
import About from "../src/User/pages/About";
import Login from "../src/User/pages/Login";

// Admin
import AdminLayout from "../src/admin/components/Layout/AdminLayout";
import Dashboard from "../src/admin/pages/Dashboard";
import AddATM from "./admin/pages/atm/AddATM";
import ViewATM from "./admin/pages/atm/ViewATM";
import AddBank from "./admin/pages/bank/AddBank";
import ViewBank from "./admin/pages/bank/ViewBank";
import ManageUsers from "./admin/pages/user/ManageUsers";
import BlockedUsers from "./admin/pages/user/BlockedUsers";
import AuthPage from "../src/admin/pages/AuthPage";
function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const PublicLayout = () => (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Outlet />
      <Footer />
    </>
  );
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />  
       <Route element={<PublicLayout />}>
       <Route path="/User" element={<Home searchQuery={searchQuery}/>}/> 
          <Route path="banks" element={<Banks />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin/login" element={<AuthPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="atms">
            <Route index element={<ViewATM />} />
            <Route path="add" element={<AddATM />} />
          </Route>
          
          <Route path="banks">
            <Route index element={<ViewBank />} />
            <Route path="add" element={<AddBank />} />
          </Route>
          
          <Route path="users">
            <Route path="manage" element={<ManageUsers />} />
            <Route path="blocked" element={<BlockedUsers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
