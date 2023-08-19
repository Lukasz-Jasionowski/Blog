import React, { useState } from 'react'


function LoginPage() {
    const serverURL = process.env.REACT_APP_SERVER_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function login(e) {
        e.preventDefault();
        await fetch(`${serverURL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type='text'
                placeholder='username'
                value={username}
                onChange={e => setUsername(e.target.value)} />

            <input type='password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}

export default LoginPage