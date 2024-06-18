import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../UserContext';

const Header = () => {
    const { user } = useUser();

    return (
        <nav>
            <ul>
                <li><NavLink to="/" end>Home</NavLink></li>
                {!user && (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                    </>
                )}
                {user && (
                    <>
                        <li><NavLink to="/create-post">Create Post</NavLink></li>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
