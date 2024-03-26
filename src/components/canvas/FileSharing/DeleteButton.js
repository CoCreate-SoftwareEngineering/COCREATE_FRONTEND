import React, { useState } from 'react';


const ImageButton = ({onClick}) => {
  const [showImage, setShowImage] = useState(false);
  // Specify the image URL
  const imageUrl = "tick.png"; 

  const handleClick = () => {
    setShowImage(prev => !prev);
  };

  return (
    <button className='del-button' onClick={onClick}>
        <div 
        className="image-button" 
        onClick={handleClick}
        style={{
            width: '25px', 
            height: '25px', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            overflow: 'hidden', // Ensure the image does not exceed the button boundaries
            backgroundImage: showImage ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        >
        {!showImage && ''} {/* Display text only if the image isn't showing */}
        </div>
    </button>
  );
};

export default ImageButton;
