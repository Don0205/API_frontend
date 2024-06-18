// components/Post.js
import React from 'react';

const Post = ({ title, company, image, description, likes = [], comments = [] }) => {
    return (
        <div className="post">
            <h2>{title}</h2>
            <p>Author's Company: {company}</p>
            {image && <img src={image} alt="Post" />}
            <p>{description}</p>
            <div className="interactions">
                <button>Like {likes.length}</button>
                <button>Comment {comments.length}</button>
            </div>
        </div>
    );
};

export default Post;