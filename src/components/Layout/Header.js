// src/components/Layout/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/create-post">Create Post</NavLink></li>
            </ul>
        </nav>
    );
};

export default Header;
