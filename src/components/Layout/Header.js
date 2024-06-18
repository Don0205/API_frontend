import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../UserContext';

const Header = () => {
    const { user } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        setIsLoggedIn(user);
    }, [user]);

    return (
        <nav>
            <ul>
                <li><NavLink to="/" end>Home</NavLink></li>
                {isLoggedIn ? (
                    <>
                        <li><NavLink to="/create-post">Create Post</NavLink></li>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
