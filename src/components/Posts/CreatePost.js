import React, { useState } from 'react';
import apiService from '../apiService'; // Adjust path as per your project structure


import { useUser } from '../UserContext';

const CreatePost = () => {
  const { user } = useUser();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [company, setCompany] = useState(user.company);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

console.log(`user company: ${company}`)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(`company : ${user.company}`)
      if (!title || !content) {
        console.error('Title and Content are required');
        return; // Optionally handle this case with UI feedback
      }

      const response = await apiService.post('/posts', {
        title,
        content,
        image,
        company: company
      });

      console.log('Post created:', response.data);
      // Handle success, update state, show feedback to user, etc.
      alert("post creat successfully")

      setLoading(false);
    } catch (error) {
      console.error('Error creating post:', error.response.data);
      // Handle error, show error message to user, etc.
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
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
