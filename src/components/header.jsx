import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from './tooltip'
import { getTriviaCategories } from '../utils/triviaAPI';
import '../css/header.css'
import { GlobalData } from '../context/GlobalContext';




const Header = () => {
    const { selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, userData, setUserData, results, setResults } = useContext(GlobalData);
    const location = useLocation();
    const [showTooltip, setShowTooltip] = useState(location.pathname === '/');
    const [showTooltipButton, setShowTooltipButton] = useState(location.pathname === '/');
    const [showSettingsButton, setShowSettingsButton] = useState(location.pathname !== '/');
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileLink, setShowProfileLink] = useState(false);


    const toggleProfileMenu = () => {
        setIsLoggedIn(!isLoggedIn);
        setShowProfileMenu(!showProfileMenu);
    };


    const toggleSettingMenu = () => {
        setShowSettingsMenu(!showSettingsMenu);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const triviaCategories = await getTriviaCategories();
                // setCategories(triviaCategories); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    // const changeDifficulty = (newDifficulty) => {
    //     setDifficulty(newDifficulty);
    // };

    // const changeCategory = (event) => {
    //     const newCategory = event.target.value;
    //     setCategory(newCategory);
    // };

    useEffect(() => {
        // console.log('Current pathname:', location.pathname);
        setShowTooltip(location.pathname === '/');
        setShowTooltipButton(location.pathname === '/');
        setShowSettingsButton(location.pathname === '/game-room')
    }, [location]);

    const ProfileMenu = () => {
        return (
            <div className="profileMenu">
                <ul>
                    {userData && location.pathname !== '/profile' && (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    )}

                    {!userData && location.pathname !== '/login' && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {!userData && location.pathname !== '/signup' && (
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    )}
                    {location.pathname !== '/' && (
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                    )}
                </ul>
            </div>
        );
    };


    return (
        <header className="header">
            <nav>
                <ul>
                    <li className='directions'>
                        {showTooltipButton && (
                            <button className='directionsButton'>
                                <img src='https://img.icons8.com/pulsar-line/48/ask-question.png' />
                            </button>
                        )}
                        {showTooltip && (
                            <div className='directionsTooltip'>
                                You can play without making an account.
                                Choose your difficulty, and categories then play on!
                                If you have an account or want to signup just hit that profile button to get started.
                            </div>
                        )}
                    </li>

                    {showSettingsButton && (
                        <li className="settings">
                            <div className='settingsContainer'>
                                <button className="settingsButton" onClick={toggleSettingMenu}>
                                    <img src='https://img.icons8.com/ios-filled/50/settings.png' alt="Settings" />
                                </button>
                                {showSettingsMenu && (
                                    <div className='settingsMenu'>
                                        {/* <button>Change Difficulty</button>
                                        <button>Change Category</button> */}
                                        <button onClick={() => window.location.href = '/'}>Quit</button>
                                    </div>
                                )}

                            </div>
                        </li>
                    )}



                    <li className="profile">
                        <button className='profileButton' onClick={toggleProfileMenu}>
                            <img src='https://img.icons8.com/wired/64/test-account.png' />
                        </button>
                        {showProfileMenu && <ProfileMenu />}

                    </li>


                </ul>
            </nav>
        </header>
    );
}

export default Header;
