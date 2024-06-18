// src/components/Posts/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

import Post from './Post';

const PostList = () => {
    const { user } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setIsLoggedIn(user);
    }, [user]);


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('http://localhost:5000/api/posts');
            setPosts(res.data);
        };

        fetchPosts();
    }, []);



    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    isLoggedIn ? (
                        <li key={post._id}>
                            <Link to={`/posts/${post._id}`}>edit</Link>
                            <div className="post-list">
                                
                                    <Post
                                        key={post._id}
                                        title={post.title}
                                        company={post.company}
                                        image={post.image}
                                        description={post.description}
                                        likes={post.likes}
                                        comments={post.comments}
                                    />
                               
                            </div>
                        </li>) : (
                        <div className="post-list">
                            {posts.map((post) => (
                                <Post
                                    key={post._id}
                                    title={post.title}
                                    company={post.company}
                                    image={post.image}
                                    description={post.description}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                            ))}
                        </div>
                    )
                ))}
            </ul>
        </div>
    );
};

export default PostList;
