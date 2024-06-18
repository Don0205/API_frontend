import React, { useState } from 'react';
import apiService from '../apiService'; // Adjust path as necessary

const Post = ({ title, company, image, description, likes = [], comments = [], user }) => {
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(prev => !prev); // Toggle showComments state
    };

    const handleDeleteComment = (commentId) => {
        // Handle deletion logic here, e.g., call an API to delete the comment
        console.log(`Deleting comment with ID ${commentId}`);
        // Update state or perform any necessary operations after deletion
    };

    return (
        <div className="post">
            <h2>{title}</h2>
            <p>Author's Company: {company}</p>
            {image && <img src={image} alt="Post" />}
            <p>{description}</p>
            <div className="interactions">
                <button>Like {likes.length}</button>
                <button onClick={toggleComments}>
                    Comment {comments.length}
                </button>
            </div>
            {showComments && (
                <div className="comments">
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>
                                    <p>{comment.text}</p>
                                    <p>Posted by: {comment.user}</p>
                                    {/* Render delete button if current user is comment author or admin */}
                                    {(user && (user.isAdmin || user._id === comment.user)) && (
                                        <button onClick={() => handleDeleteComment(comment._id)}>
                                            Delete
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Post;
