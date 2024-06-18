import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import apiService from '../apiService'; // Adjust path as necessary

import Post from './Post';

const PostList = () => {
    const { user } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

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

    useEffect(() => {
        // Function to filter posts based on search query
        const filterPosts = () => {
            const lowerCaseQuery = searchQuery.toLowerCase().trim();
            if (!lowerCaseQuery) {
                setFilteredPosts(posts); // No query, show all posts
            } else {
                const filtered = posts.filter(post => (
                    post.title.toLowerCase().includes(lowerCaseQuery) ||
                    post.content.toLowerCase().includes(lowerCaseQuery)
                ));
                setFilteredPosts(filtered);
            }
        };

        filterPosts();
    }, [searchQuery, posts]);

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
            <div>
                <input
                    type="text"
                    placeholder="Search by title or content"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <ul>
                {filteredPosts.map(post => (
                    <li key={post._id}>
                        {(user && (user.isAdmin && user.company === post.company)) && (
                            <Link to={`/posts/${post._id}`}>edit</Link>
                        )}
                        <div className="post-list">
                            <Post
                                key={post._id}
                                title={post.title}
                                company={post.company}
                                image={post.image}
                                description={post.content}
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
