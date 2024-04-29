import React, { useState } from 'react';
import axios from '../axiosconfig';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/register', { username, email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/');
            return true;
        } catch (error) {
            setError('Failed to Signup!');
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username:</label>
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Signup!</button>
            </form>
        </div>
    );
};

export default Signup;
