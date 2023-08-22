import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'

function Header() {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            });
        });
    }, []);
    return (
        <div>
            <header>
                <Link to="/" className="logo">My Blog</Link>
                <nav>
                    {username && (
                        <>
                            <Link to={'/create'}>Create new post</Link>
                        </>
                    )}
                    {!username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </header>
        </div>
    )
}

export default Header