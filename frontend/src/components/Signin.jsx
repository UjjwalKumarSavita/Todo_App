import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({setIsAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_BASE_ADDRESS +"auth/signin", { username, password });
      // On successful login, save the token to localStorage or cookies
      localStorage.setItem("token", response.data.token);
      setSuccess("Login successful!");
      navigate("/")
      setIsAuthenticated(true);
      setError("");
    } catch (err) {
        console.log(err);
      setError("Invalid credentials or server error");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-[#81007696] mb-6">
          Sign In
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 text-center mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ebb70e]"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ebb70e]"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#81007696] text-white font-semibold rounded-md hover:bg-[#d59f06] focus:outline-none"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="text-[#ebb70e] cursor-pointer hover:underline"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;