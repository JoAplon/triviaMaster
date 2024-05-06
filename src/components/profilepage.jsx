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


const Profile = ({ incorrectAnswers, questions, difficulty, category, userId }) => {
    // const [userData, setUserData] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [leaderboardPosition, setLeaderboardPosition] = useState(null);
    const [savedCategories, setSavedCategories] = useState(null);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, userData, setUserData, results, setResults, gameResults, setGameResults } = useContext(GlobalData);
    const games = userData?.games;
    const latestGameResult = gameResults[gameResults.length - 1];
    const [copied, setCopied] = useState(false);
    const [score, setScore] = useState(null);



    // const clearGames = () => {
    //     setUserData(prevUserData => ({
    //         ...prevUserData,
    //         games: []
    //     }));
    // };

    const clearGames = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            await axios.delete("/api/games", { headers });
            setGames([]);
        } catch (error) {
            console.error('Error clearing games:', error);
        }
    };
    const fetchGameData = async () => {
        try {
            const response = await axios.get("/api/games");
            const gameData = response.data;
            // Use gameData to construct a shareable link or perform other actions
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    };
    

    useEffect(() => {
        console.log(games);
    }, [games]);


    const generateShareableLink = (gameData) => {
        // Construct the shareable link with user-specific data
        if (userData) {
          const { category, difficulty, questions } = gameData;
          const userId = userData ? userData.id : ''; // Assuming userData contains the user ID
          const link = `https://triviamindmeld.netlify.app/game-room/play?category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}&userId=${encodeURIComponent(
            userData.id)}`;
    
          return link;
        }
        return "";
      };


    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };


    useEffect(() => {


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


    useEffect(() => {
        const storedScore = localStorage.getItem('score');
        if (storedScore) {
          setScore(JSON.parse(storedScore));
        }
      }, []);

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
                            <button onClick={handleSavedPictures}>Save</button>
                        </ul>
                    </div>
                )}

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
            </div>

            <div className="gameResults">
                <h2>Game Results: </h2>
                {games?.length > 0 && (
                    <div>
                        <p>Category: {games[games.length - 1].category}</p>
                        <p>Difficulty: {games[games.length - 1].difficulty}</p>
                        <p>Score: {score}/10</p>
                        {/* <a href={`https://triviamindmeld.netlify.app/play?category=${encodeURIComponent(games[games.length - 1].category)}&difficulty=${encodeURIComponent(games[games.length - 1].difficulty)}`}>Play this game</a>
                        <button onClick={() => copyToClipboard(`/play?category=${encodeURIComponent(games[games.length - 1].category)}&difficulty=${encodeURIComponent(games[games.length - 1].difficulty)}`)}>Copy link</button> */}
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
                            {/* <a href={`https://triviamindmeld.netlify.app/game-room/play?category=${encodeURIComponent(game.category)}&difficulty=${encodeURIComponent(game.difficulty)}`}>Play this game</a>
                            <button onClick={() => copyToClipboard(`https://triviamindmeld.netlify.app/game-room/play?category=${encodeURIComponent(game.category)}&difficulty=${encodeURIComponent(game.difficulty)}`)}>Copy link</button> */}
                        </div>
                    ))}
                    {games && games.length > 0 && <button className="clearGamesButton" onClick={clearGames}>Clear Games</button>}

                </div>
                <div className="cheatsheetContainer">
                    <ul className="cheatsheet">
                    <p>Category Cheatsheet: </p>
                            <li>9 = General knowledge</li>
                            <li>10 = Books</li>
                            <li>11 = Film</li>
                            <li>12 = Music</li>
                            <li>13 = Musicals</li>
                            <li>14 = TV</li>
                            <li>15 = Video Games</li>
                            <li>16 = Board Games</li>
                            <li>17 = Science/Nature</li>
                            <li>18 = Computers</li>
                            <li>19 = Math</li>
                            <li>20 = Mythology</li>
                            <li>21 = Sports</li>
                            <li>22 = Geography</li>
                            <li>23 = History</li>
                            <li>24 = Politics</li>
                            <li>25 = Art</li>
                            <li>26 = Celebrities</li>
                            <li>27 = Animals</li>
                            <li>28 = Vehicles</li>
                            <li>29 = Comics</li>
                            <li>30 = Gadgets</li>
                            <li>31 = Anime/Manga</li>
                            <li>32 = Animation</li>
                    </ul>
                </div>
            </div>
            <div className="logoutContainer">
                <Logout />
            </div>
        </div>
    );
};

export default Profile;
