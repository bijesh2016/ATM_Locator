import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password123") {
      alert("Login Successful!");
      navigate("/"); // Redirect to home after login
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        
        <div className="mt-4">
          <label>Email:</label>
          <input
            type="email"
            className="border p-2 w-full rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label>Password:</label>
          <input
            type="password"
            className="border p-2 w-full rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
