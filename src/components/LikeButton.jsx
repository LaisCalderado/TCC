// LikeButton.js
import React, { useState } from 'react';
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';
import './LikeButton.css'; // Import the CSS file for the LikeButton

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLiked((prevLiked) => !prevLiked);
        setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    };

    return (
        <div className="like-button-container">
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                {liked ? <AiTwotoneDislike /> : <AiTwotoneLike />}
            </button>
            <p className="like-count">{likes} {likes === 1 ? 'Like' : 'Likes'}</p>
        </div>
    );
};

export default LikeButton;
