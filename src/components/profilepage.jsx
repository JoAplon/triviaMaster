import React, { useState, useEffect } from "react";
import axios from "../axiosconfig";
import Logout from '../components/logout';
import ProfilePictures from "./profilePics";
import Mouse from '../assets/tinyMouse.jpg';
import '../css/profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [leaderboardPosition, setLeaderboardPosition] = useState(null);
    const [savedCategories, setSavedCategories] = useState(null);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const [gameId, setGameId] = useState(null);

    // useEffect(() => {
    //     const startNewGame = async () => {
    //         try {
    //             const token = localStorage.getItem('token'); 
    //             const headers = {
    //                 'Authorization': `Bearer ${token}`
    //             };
    //             const userDataResponse = await axios.get("api/users/me", { headers });
    //             const userId = userDataResponse.data.userId;

    //             const response = await axios.post('/api/game/start', { userId, categories: savedCategories }, { headers });
    //             setGameId(response.data.gameId);
    //         } catch (error) {
    //             console.error('Error starting a new game:', error);
    //         }
    //     };

    //     startNewGame();
    // }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                console.log('Token:', token);
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const response = await axios.get("api/users/me", { headers });
                console.log('Response data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error.response.data('Error fetching user data.', error);
            }
        };

    //     const fetchLeaderboardPosition = async (difficulty) => {
    //         try {
    //             const response = await axios.get(`api/leaderboard/${difficulty}`);
    //             setLeaderboardPosition(response.data.position);
    //         } catch (error) {
    //             console.log('Error fetching leaderboard position.');
    //         }
    //     };

        const fetchSavedCategories = async () => {
            try {
                const response = await axios.get("api/categories");
                setSavedCategories(response.data);
            } catch (error) {
                console.log('Error fetching saved categories');
            }
        };

        fetchUserData();

    //     fetchLeaderboardPosition("easy");
    //     fetchLeaderboardPosition("medium");
    //     fetchLeaderboardPosition("hard");
       fetchSavedCategories();
    }, []);





    const profilePictures = {
        tinyMouse: '/assets/tinyMouse.jpg',
        snakeInSweater: '/assets/snake-in-sweater.jpg',
        breadCat: '/assets/bread-cat.webp',
        catWithKnife: '/assets/catwkmife.jpg',
        cowboyCat: '/assets/catz.jpg',
        ryanGosling: '/assets/doubt.jpg',
        ronLikesVeggies: '/assets/ron-likes-veggies.jpg',
        ronSmiling: '/assets/ron-smiling.jpg',
        ronSwanson: '/assets/ron-swanson.jpg',
    };

    const handlePictureSelect = (picture) => {
        setSelectedPicture(picture)
    };

    const handleSavedPictures = () => {
        console.log('Selected picture: ', selectedPicture);
        setShowPopup(false);
    }

    const toggleUserInfo = () => {
        setShowInfo(!showInfo);
    }

    return (
        <div className="profileContainer">
            <h2>Welcome to Your Profile, {userData && userData.username}!</h2>

            <div className="pictureContainer">
                <div className="profile-picture">
                    <img src={selectedPicture || Mouse } alt="Profile" />
                    <button class="picButton" onClick={() => setShowPopup(true)}>Change Picture</button>
                </div>
                {showPopup && (
                    <div className="popup-menu">
                        <h3>Select Profile Picture: </h3>
                        <ProfilePictures
                            pictures={Object.keys(profilePictures)}
                            onSelectPicture={handlePictureSelect}
                        />
                        <button class="saveButton" onClick={handleSavedPictures}>Save</button>
                    </div>
                )}
            </div>

            {userData && (
                <div className="userDetails">
                    <button className="userDetailsButton" onClick={toggleUserInfo}> Your info: </button>
                    {showInfo && (
                        <div className="basicUserInfo">
                            <p>Username: {userData.username}</p>
                            <p>Email: {userData.email}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="leaderboardCategory">
                <div className="leaderboardDisplay">
                    <p>Here you are on the Leaderboard!</p> <br/>
                    {leaderboardPosition && (
                        <ul>
                            <li>Easy: {leaderboardPosition.easy}</li>
                            <li>Medium: {leaderboardPosition.medium}</li>
                            <li>Hard: {leaderboardPosition.hard}</li>
                        </ul>
                    )}
                </div>
                <div className="categoryDisplay">
                    <p>These are your favorite categories!</p> <br/>
                    {savedCategories && (
                        <ul>
                            {savedCategories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="logoutContainer">
                <Logout/>
            </div>
        </div>
    );
};

export default Profile;
