import React, { useState } from 'react'
import { BiLike } from 'react-icons/bi'

const MiniChallenge1 = () => {

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLikes(prevCount => prevCount + 1) // Increment Likes
        setLiked(true); // Change button color
    }

    return (
        <div>
            <button className='cstm' onClick={handleClick} style={{ backgroundColor: liked ? 'blue' : 'gray', color: 'white' }}> <BiLike /> {liked ? 'Liked!' : 'Like'}</button>
            <p>Likes : {likes}</p>
        </div>
    )
}

export default MiniChallenge1