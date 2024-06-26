import React, { useState } from 'react';
import axios from '../axiosconfig';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const { token } = response.data;
            // console.log(user);
    
            localStorage.setItem('token', token);
            
            navigate('/');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login!</button>
            </form>
            <div>
                <p>Oops! Don't have an account? <Link to="/signup">Sign Up</Link></p>
                {/* <p>Oh no! Forgot your password? <Link to="/forgot-password">Reset Password</Link></p> */}
            </div>
        </div>
    );
};

export default Login;
