import React, { useState } from 'react'

const MiniChallenge3 = (recipe) => {

    const [spiceLevel, setSpiceLevel] = useState(0); // 0-5
    const [favorite, setFavorite] = useState(false); // boolean

    const toggle = () => {
        setFavorite(!favorite);
    }

    const increaseSpice = () => {
        setSpiceLevel(prev => (prev < 5 ? prev + 1 : 5))
    }

    const decreaseSpice = () => {
        setSpiceLevel(prev => (prev > 0 ? prev - 1 : 0))
    }
    

    return (
        <div>

        </div>
    )
}

export default MiniChallenge3