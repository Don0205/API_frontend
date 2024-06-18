// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    company: '',
    companyAuthCode: ''
  });

  const { username, email, password, isAdmin, company, companyAuthCode } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     

      const body = { username, email, password, isAdmin, company, companyAuthCode };

      const res = await axios.post('http://localhost:5000/api/auth/register', body);
      console.log(res.data); // Handle success, e.g., redirect to login page
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
      <label>
        <input type="checkbox" name="isAdmin" checked={isAdmin} onChange={() => setFormData({ ...formData, isAdmin: !isAdmin })} />
        Admin
      </label>
      {isAdmin && (
        <>
          <input type="text" name="company" placeholder="Company Name" value={company} onChange={handleChange} required />
          <input type="text" name="companyAuthCode" placeholder="Company Auth Code" value={companyAuthCode} onChange={handleChange} required />
        </>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
