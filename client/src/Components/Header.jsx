import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const Server_URL = process.env.REACT_APP_SERVER_URL;
    const [username, setUsername] = useState(null);
    useEffect(() => {
        fetch(`${Server_URL}/profile`, {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            });
        });
    }, []);

    function logout() {
        fetch(`${Server_URL}/logout`, {
            credentials: 'include',
            method: 'POST'
        });
        setUsername(null);
    };

    return (
        <div>
            <header>
                <Link to="/" className="logo">My Blog</Link>
                <nav>
                    {username && (
                        <>
                            <Link to={'/create'}>Create new post</Link>
                            <a onClick={logout}>Logout</a>
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