import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Logout = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user data
        setUser(null);
        // Remove token from local storage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
    }, [navigate, setUser]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;
