import React, { useState } from 'react';
import apiService from '../apiService'; // Adjust path as per your project structure
import { useUser } from '../UserContext';

const CreatePost = () => {
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // To store file object
    const [imagePreview, setImagePreview] = useState(''); // To store image preview URL
    const [loading, setLoading] = useState(false);

    // Function to handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the file object
        setImage(file); // Set the file object in state
        setImagePreview(URL.createObjectURL(file)); // Create image preview URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!title || !content ) {
                console.error('Title, Content are required');
                return; // Optionally handle this case with UI feedback
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', imagePreview); // Append the file object
            formData.append('company', user.company); // Append other data

            const response = await apiService.post('/posts', formData);

            console.log('Post created:', response.data);
            alert('Post created successfully');

        } catch (error) {
            console.error('Error creating post:', error.response?.data);
            // Handle error, show error message to user, etc.
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.isAdmin) {
        return <div>You are not authorized to access this page.</div>;
    }

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={handleImageChange} />
                    {imagePreview && (
                        <img src={imagePreview} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    )}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
