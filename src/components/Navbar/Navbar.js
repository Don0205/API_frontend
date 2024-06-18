import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

const Navbar = () => {
    const { user } = useUser();

    return (
        <nav>
            <ul>
                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                {user && (
                    <>
                        <li><Link to="/create-post">Create Post</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
