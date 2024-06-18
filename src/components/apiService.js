// apiService.js

import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const setAuthToken = (token) => {
    if (token) {
        apiService.defaults.headers.common['x-auth-token'] = `${token}`;
        console.log("api header setted")
    } else {
        delete apiService.defaults.headers.common['x-auth-token'];
        console.log("api header deleated")
    }
};

// Set token initially if present in localStorage
const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

export default apiService;