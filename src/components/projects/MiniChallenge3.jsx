import React, { useState } from 'react'

const MiniChallenge3 = (recipe) => {

    const [spiceLevel, setSpiceLevel] = useState(0); // 0-5
    const [favorite, setFavorite] = useState(false); // boolean


    const toggleFavorite = () => {
        setFavorite(!favorite);
    }

    const increaseSpice = () => {
        setSpiceLevel(prev => (prev < 5 ? prev + 1 : 5))
    }

    const decreaseSpice = () => {
        setSpiceLevel(prev => (prev > 0 ? prev - 1 : 0))
    }



    return (
        <div
            className={`p-6 rounded-lg shadow-md transition-all duration-300 ${favorite ? 'bg-yellow-100' : 'bg-white'
                }`}
            style={{
                border: `2px solid ${favorite ? '#F59E0B' : '#E5E7EB'}`,
            }}
        >
            <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
            <p className="text-gray-700 mb-4">{recipe.description}</p>

            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={toggleFavorite}
                    className={`px-3 py-1 rounded-md ${favorite ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-black'
                        }`}
                >
                    {favorite ? '★ Favorite' : '☆ Favorite'}
                </button>

                <span>Spice Level: {spiceLevel}</span>
                <button onClick={increaseSpice} className="px-2 py-1 bg-red-500 text-white rounded-md">+</button>
                <button onClick={decreaseSpice} className="px-2 py-1 bg-gray-300 rounded-md">-</button>
            </div>

            <ul className="list-disc pl-5 text-gray-600">
                {ArrayData.recipe.ingredients.map((ing, i) => (
                    <li
                        key={i}
                        className={favorite && i % 2 === 0 ? 'text-red-500 font-semibold' : ''}
                    >
                        {ing}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MiniChallenge3