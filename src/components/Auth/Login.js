import React, { useState } from 'react';
import axios from 'axios'; // Import Axios if not already imported
import { setAuthToken } from '../apiService'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Login = () => {
    
    const { setLogin } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            const { token } = response.data;

            // Set token to localStorage
            localStorage.setItem('token', token);

            // Set token to Axios headers
            setAuthToken(token);
            console.log("token setted")
            setLogin(true);

            navigate('/');

            

            // Optionally, you can redirect to another page or update state to indicate successful login
        } catch (err) {
            console.error('Login error:', err.response.data);
            // Handle login error (show error message, reset form, etc.)
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                required
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                //minLength="6"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
