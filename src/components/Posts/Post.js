import React, { useState, useEffect  } from 'react';
import apiService from '../apiService'; // Adjust path as necessary

const Post = ({ title, company, image, description, likes = [], comments = [], user, postid }) => {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false); // State to track if user has liked the post
    const [likeNum, setLikeNum] = useState(likes.length); // State to track if user has liked the post

    useEffect(() => {
        // Check if the user's ID is in the likes array
        if (user && likes.includes(user._id)) {
            setLiked(true);
        }
    }, [user, likes]);

    
    const toggleComments = () => {
        setShowComments(prev => !prev); // Toggle showComments state
    };


    const handleDeleteComment = async (commentId) => {
        try {
            console.log(`delete post id ${postid} ; commentid ${commentId}`)
            await apiService.delete(`http://localhost:5000/api/posts//comment/${postid}/${commentId}`);

        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async () => {
        try {
            
            if (liked) {
                console.log("in dislike function")
                // dislike the post
                await apiService.put(`http://localhost:5000/api/posts/dislike/${postid}`);
                setLiked(false);
                setLikeNum(likeNum-1)
            } else {
                console.log("in like function")
                // Like the post
                await apiService.put(`http://localhost:5000/api/posts/like/${postid}`);
                setLiked(true);
                setLikeNum(likeNum+1)
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <div className="post">
            <h2>{title}</h2>
            <p>Author's Company: {company}</p>
            {image && <img src={image} alt="Post" />}
            <p>{description}</p>
            <div className="interactions">
                <button onClick={handleLike}>
                    {liked ? 'Unlike' : 'Like'} {likeNum}
                </button>
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
