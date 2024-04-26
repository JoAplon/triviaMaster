// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from './tooltip'
import '../css/header.css'


const Header = () => {
    const location = useLocation();
    const [showTooltip, setShowTooltip] = useState(location.pathname === '/');
    const [showTooltipButton, setShowTooltipButton] = useState(location.pathname === '/');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };


    useEffect(() => {
        // console.log('Current pathname:', location.pathname);
        setShowTooltip(location.pathname === '/');
        setShowTooltipButton(location.pathname === '/');
    }, [location]);

    const ProfileMenu = () => {
        return (
            <div className="profileMenu">
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <header className="header">
            <nav>
                <ul>
                    {/* tooltip button dissapears when you leave the page
                     but you need to refresh first. will come back to it later. */}
                    <li className='directions'>
                        {showTooltipButton && (
                        <button className='directionsButton'>
                            <img src='https://img.icons8.com/pulsar-line/48/ask-question.png'/>
                        </button>
                        )}
                        {showTooltip && (
                            <div className='directionsTooltip'>
                                You can play without making an account.
                                Choose your difficulty, categories, and number of questions then play on!
                                If you have an account or want to signup just hit that profile button to get started.
                            </div>
                        )}
                    </li>
                    <li className="profile">
                        <button className='profileButton'  onClick={toggleProfileMenu}>
                        <img src='https://img.icons8.com/wired/64/test-account.png'/>
                        </button>
                        {showProfileMenu && <ProfileMenu />}
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;
