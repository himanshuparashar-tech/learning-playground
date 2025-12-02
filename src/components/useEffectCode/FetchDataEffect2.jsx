import React, { useEffect, useState } from 'react'

const FetchDataEffect2 = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json()
            setPosts(data)
        }

        fetchData();
    }, []);

    return (
        <div className='border border-purple-400 p-3'>
            <h1>First Post Title : </h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} className='mb-1'>
                            <h2> <strong>Title: </strong>{post.title}</h2>
                        </li>
                    ))}
                </ul>
            )
                :
                (
                    <p>loading...</p>
                )}
        </div>
    );
};

export default FetchDataEffect2