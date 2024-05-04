import React, { useState, useEffect, useContext } from "react";
import axios from "../axiosconfig";
import Logout from '../components/logout';
// import ProfilePictures from "./profilePics";
import Mouse from '../assets/tinyMouse.jpg';
import breadCat from '../assets/bread-cat.webp';
import dangerCat from '../assets/catwknife.jpg';
import cowboyCat from '../assets/catz.jpg';
import ryanGos from '../assets/doubt.jpg';
import ronEatsVeggies from '../assets/ron-likes-veggies.jpg';
import ronSmiling from '../assets/ron-smiling.jpg';
import ronSwanson from '../assets/ron-swanson.jpg';
import snakeSweater from '../assets/snake-in-sweater.jpg';
import '../css/profile.css';
import { GlobalData } from '../context/GlobalContext';


const Profile = ({ score, incorrectAnswers, questions, difficulty, category, userId }) => {
    // const [userData, setUserData] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [leaderboardPosition, setLeaderboardPosition] = useState(null);
    const [savedCategories, setSavedCategories] = useState(null);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, userData, setUserData, results, setResults } = useContext(GlobalData);
    const games = userData?.games;
    const [copied, setCopied] = useState(false);


    const clearGames = () => {
        setUserData(prevUserData => ({
            ...prevUserData,
            games: []
        }));
    };

    useEffect(() => {
        console.log(games);
    }, [games])

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };


    // const [gameId, setGameId] = useState(null);

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

        //     const fetchLeaderboardPosition = async (difficulty) => {
        //         try {
        //             const response = await axios.get(`api/leaderboard/${difficulty}`);
        //             setLeaderboardPosition(response.data.position);
        //         } catch (error) {
        //             console.log('Error fetching leaderboard position.');
        //         }
        //     };

        // const fetchSavedCategories = async () => {
        //     try {
        //         const response = await axios.get("api/categories");
        //         setSavedCategories(response.data);
        //     } catch (error) {
        //         console.log('Error fetching saved categories');
        //     }
        // };


        // fetchGameData();

        //     fetchLeaderboardPosition("easy");
        //     fetchLeaderboardPosition("medium");
        //     fetchLeaderboardPosition("hard");
        // fetchSavedCategories();
    }, []);





    const profilePictures = [
        { id: 1, src: breadCat },
        { id: 2, src: dangerCat },
        { id: 3, src: cowboyCat },
        { id: 4, src: ryanGos },
        { id: 5, src: ronEatsVeggies },
        { id: 6, src: ronSmiling },
        { id: 7, src: ronSwanson },
        { id: 8, src: snakeSweater },

    ];

    useEffect(() => {
        const storedPicture = localStorage.getItem('selectedPicture');
        if (storedPicture) {
            setSelectedPicture(storedPicture);
        }
    }, []);

    const handlePictureSelect = (picture) => {
        setSelectedPicture(picture);
        localStorage.setItem('selectedPicture', picture);
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
                    <img src={selectedPicture || Mouse} alt="Profile" />
                    <button onClick={() => setShowPopup(true)}>Change Picture</button>
                </div>
                {showPopup && (
                    <div className="popup-menu">
                        <ul className="profile-picture-list">
                            {profilePictures.map(picture => (
                                <li key={picture.id}>
                                    <img
                                        src={picture.src}
                                        alt={`Profile ${picture.id}`}
                                        onClick={() => handlePictureSelect(picture.src)}
                                    />
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleSavedPictures}>Save</button>
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

            <div>
                <h2>Game Results: </h2>
                {games?.length > 0 && (
                    <div>
                        <p>Category: {games[games.length - 1].category}</p>
                        <p>Difficulty: {games[games.length - 1].difficulty}</p>
                        <a href={`/play?category=${encodeURIComponent(games[games.length - 1].category)}&difficulty=${encodeURIComponent(games[games.length - 1].difficulty)}`}>Play this game</a>
                        <button onClick={() => copyToClipboard(`/play?category=${encodeURIComponent(games[games.length - 1].category)}&difficulty=${encodeURIComponent(games[games.length - 1].difficulty)}`)}>Copy link</button>
                    </div>
                )}
            </div>

            <div className="leaderboardCategory">
                {/* <div className="leaderboardDisplay">
                    <p>Here you are on the Leaderboard!</p> <br />
                    {leaderboardPosition && (
                        <ul>
                            <li>Easy: {leaderboardPosition.easy}</li>
                            <li>Medium: {leaderboardPosition.medium}</li>
                            <li>Hard: {leaderboardPosition.hard}</li>
                        </ul>
                    )}
                </div> */}

                <div className="categoryDisplay">
                    <p>Recent Games:</p> <br />
                    {games?.map((game, index) => (
                        <div key={index}>
                            <p>Category: {game.category}</p>
                            <p>Difficulty: {game.difficulty}</p>

                            <a href={`/play?category=${encodeURIComponent(game.category)}&difficulty=${encodeURIComponent(game.difficulty)}`}>Play this game</a>
                            <button onClick={() => copyToClipboard(`https://triviamindmeld.netlify.app/play?category=${encodeURIComponent(game.category)}&difficulty=${encodeURIComponent(game.difficulty)}`)}>Copy link</button>
                        </div>
                    ))}
                                        {games && games.length > 0 && <button onClick={clearGames}>Clear Games</button>}

                </div>
            </div>
            <div className="logoutContainer">
                <Logout />
            </div>
        </div>
    );
};

export default Profile;
