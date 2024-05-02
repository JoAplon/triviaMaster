import React, { useState } from 'react';
import axios from '../axiosconfig';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
    try {

        localStorage.removeItem('token');

        navigate('/');
    } catch (error) {
        console.log('Error removing token from local storage', error);
    }
};

return (
    <button className='logoutButton' onClick={handleLogout}>Logout</button>
);
};

export default Logout;