import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  // State to manage form inputs
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    // Basic validation
    if (!name || !password) {
      setError('Both name and password are required!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    try {
      // Send the POST request to backend
      const response = await axios.post(import.meta.env.VITE_BASE_ADDRESS +'auth/signup', { username: name, password });
      console.log(response);
      

      // On success
      if (response.data.success) {
        setSuccess('Signup successful!');
        setError("");
        setName('');
        setPassword('');
        setError('');
      }
    } catch (err) {
      if(err.response.status)
        console.log(err);
        if(err.response.status==400){
            setError('Username Already Taken!');
        } else if(err.response.status==500){
            setError('Internal Server Error. Try Again!');
        }
        setSuccess("")
    }
  };

  return (
    <div className="signup-container my-28 p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
  <h2 className="text-3xl font-bold text-center text-[#81007696] mb-4">Signup</h2>

  {/* Error and Success Messages */}
  {error && <div className="error text-red-600 text-center mb-4">{error}</div>}
  {success && <div className="success text-green-600 text-center mb-4">{success}</div>}

  {/* Signup Form */}
  <form onSubmit={handleSubmit} className="signup-form space-y-6">
    <div className="form-group">
      <label htmlFor="name" className="block text-lg font-semibold text-[#eb0e0e]">Username</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ebb70e] focus:outline-none"
      />
    </div>

    <div className="form-group">
      <label htmlFor="password" className="block text-lg font-semibold text-[#eb0e0e]">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength="6"
        className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ebb70e] focus:outline-none"
      />
    </div>

    <button 
      type="submit" 
      className="w-full py-3 mt-4 bg-[#81007696] text-white font-semibold rounded-lg hover:bg-[#eb0e0e] focus:outline-none"
    >
      Sign Up
    </button>
  </form>
</div>

  );
};

export default Signup;