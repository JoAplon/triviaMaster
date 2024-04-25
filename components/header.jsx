// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from '../components/tooltip'

const Header = () => {
    const location = useLocation();
    const [showTooltip, setShowTooltip] = useState(location.pathname === '/');

    useEffect(() => {
        console.log('Current pathname:', location.pathname);
        setShowTooltip(location.pathname === '/');
    }, [location]);

    return (
        <header className="header">
            <nav>
                <ul>
                    {/* tooltip button dissapears when you leave the page
                     but you need to refresh first. will come back to it later. */}
                    <li className='directions'>
                        <button className='directionsButton'>
                            <img src='https://img.icons8.com/pulsar-line/48/ask-question.png'/>
                        </button>
                        {showTooltip && (
                            <div className='directionsTooltip'>
                                You can play without making an account.
                                Choose your difficulty, categories, and number of questions then play on!
                                If you have an account or want to signup just hit that profile button to get started.
                            </div>
                        )}
                    </li>
                    <Link to="profile">
                        <button className='profileButton'>
                        <img src='https://img.icons8.com/wired/64/test-account.png'/>
                        </button>
                    </Link>

                </ul>
            </nav>
        </header>
    );
}

export default Header;
