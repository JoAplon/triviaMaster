import React, { useState } from 'react';
import axios from 'axios';
import '../css/signupPage.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('email', email);
//         formData.append('password', password);
// console.log(formData);

        const newUser = {
            username: username,
            email: email,
            password: password,
        }
        console.log(newUser);
        try {
            const response = await axios.post('/api/users/register', newUser)
            //  {
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
            // });
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
            <div className="signup-form">
                <h2>Signup</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSignup}>
                    <div>
                        <label>Username:</label>
                        <input type="username" value={username} name='username' onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} name='email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} name='password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button class="signupButton" type="submit">Signup!</button>
                </form>
            </div>
            <div className="signup-image">
                <img src="/Screenshot 2024-04-29 at 12.44.16 PM.png" alt="Signup Visual" style={{ maxWidth: '500px', maxHeight: 'auto' }} />
            </div>
        </div>
    );
};

export default Signup;
