import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import apiService from '../apiService'; // Adjust path as necessary

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
            try {
                const res = await apiService.get('http://localhost:5000/api/posts');
                setPosts(res.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleCommentSubmit = async (postId, commentText) => {
        try {
            const response = await apiService.post(`http://localhost:5000/api/posts/comment/${postId}`, { text: commentText });

            console.log('Comment added:', response.data);
            alert('Comment added successfully');

            // Update the posts state to reflect the new comment
            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, response.data] // Append new comment to comments array
                    };
                }
                return post;
            });

            setPosts(updatedPosts);

        } catch (error) {
            console.error('Error adding comment:', error.response?.data);
            // Handle error, show error message to user, etc.
        }
    };

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        {(user && (user.isAdmin || user.company === post.company)) && (

                            <Link to={`/posts/${post._id}`}>edit</Link>

                        )}

                        <div className="post-list">
                            <Post
                                key={post._id}
                                title={post.title}
                                company={post.company}
                                image={post.image}
                                description={post.description}
                                likes={post.likes}
                                comments={post.comments}
                                user={user}
                                postid={post._id}
                            />
                            {isLoggedIn && (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const commentText = e.target.comment.value;
                                    handleCommentSubmit(post._id, commentText);
                                    e.target.comment.value = ''; // Clear input field after submission
                                }}>
                                    <input type="text" name="comment" placeholder="Add a comment" required />
                                    <button type="submit">Add Comment</button>
                                </form>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
