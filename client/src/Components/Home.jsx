import React, { useEffect, useState } from 'react'
import Post from './Post'

function Home() {
    const Server_URL = process.env.REACT_APP_SERVER_URL;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${Server_URL}/post`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    );
}

export default Home