// EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the User context
import apiService from '../apiService'; // Adjust path as necessary

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { user, loading: userLoading } = useUser();

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {

                const response = await apiService.get(`/posts/${postId}`);
                const post = response.data;
                console.log(`user ID ${user._id} ; post author ${post.author}`)
                setFormData({ title: post.title, content: post.content });


                // Check if the current user is the author or an admin
                if (user && (post.author === user._id || user.isAdmin)) {
                    console.log("auth true")
                    setAuthorized(true);
                } else {
                    console.log("auth false")
                    setAuthorized(false);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!userLoading && user) {
            fetchPost();
        }
    }, [postId, user, userLoading]);

    const { title, content } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiService.put(`/posts/${postId}`, formData);
            console.log('Post updated:', response.data);
            navigate(`/posts/${postId}`); // Navigate to post details page
        } catch (error) {
            console.error('Error updating post:', error.response.data);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log(`delete id ${id}`)
            await apiService.delete(`http://localhost:5000/api/posts/${id}`);
            
        } catch (err) {
            console.error(err);
        }
    };

    if (userLoading || loading) {
        return <div>Loading...</div>;
    }

    if (!authorized) {
        return <div>You are not authorized to edit this post.</div>;
    }

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={content}
                        onChange={onChange}
                        rows={4}
                        cols={50}
                        required
                    />
                </div>
                <button type="submit">Update Post</button>
                
                <button onClick={() => handleDelete(postId)}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;
