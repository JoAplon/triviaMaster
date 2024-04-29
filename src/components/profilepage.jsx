import React, { useState, useEffect } from "react";
import axios from "../axiosconfig";
import ProfilePictures from "./profilePics";
import '../css/profile.css'
// import tinyMouse from '../assets/tinyMouse.jpg'


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [leaderboarPosition, setLeaderboardPosition] = useState(null);
    const [savedCategories, setSavedCategories] = useState(null);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("api/users/register");
                setUserData(response.data);
            } catch (error) {
                console.log('Error fetching user data.', error);
            }
        };

        // const fetchLeaderboardPosition = async () => {
        //     try {
        //         const response = await axios.get("api/");
        //         setLeaderboardPosition(response.data.position);
        //     } catch (error) {
        //         console.log('Error fetching leaderboard position.');
        //     }
        // };

        // const fetchSavedCategories = async () => {
        //     try {
        //         const response = await axios.get("api/");
        //         setSavedCategories(response.data);
        //     } catch (error) {
        //         console.log('Error fetching saved categories');
        //     }
        // };

        fetchUserData();
        // fetchLeaderboardPosition();
        // fetchSavedCategories();
    }, []);

    const profilePictures = {
        tinyMouse: '../assets/tinyMouse.jpg',
        snakeInSweater: '../assets/snake-in-sweater.jpg',
        breadCat: '../assets/bread-cat.webp',
        catWithKnife: '../assets/catwkmife.jpg',
        cowboyCat: '../assets/catz.jpg',
        ryanGosling: '../assets/doubt.jpg',
        ronLikesVeggies: '../assets/ron-likes-veggies.jpg',
        ronSmiling: '../assets/ron-smiling.jpg',
        ronSwanson: '../assets/ron-swanson.jpg',
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
                <img src={selectedPicture || "tinyMouse.jpg"} alt="Profile" />
                <button onClick={() => setShowPopup(true)}>Change Picture</button>
            </div>
            {showPopup && (
                <div className="popup-menu">
                    <h3>Select Profile Picture: </h3>
                    <ProfilePictures
                        pictures={Object.keys(profilePictures)}
                        onSelectPicture={handlePictureSelect}
                    />
                    <button onClick={handleSavedPictures}>Save</button>
                </div>
            )}
            </div>

            {userData && (
                <div className="userDetails">
                <button className="userDetailsButton" onClick={toggleUserInfo}> Your info: 
                    {/* <img src='https://img.icons8.com/android/24/000000/edit.png'/> */}
                </button>
                {showInfo && (

                    <div className="basicUserInfo">
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                
                )}
                         {/* <p>Wins: {userData.wins}</p> */}
                 </div>
            )}

            <div className="leaderboardCategory">
            <div className="leaderboardDisplay">
                <p>Here you are on the Leaderboard!</p> <br/>
                <p>#9 1200 points!</p>
            </div>
            <div className="categoryDisplay">
                <p>These are your favorite categories! </p> <br/>
                <p>Movies</p>
                <p>Sports</p>
            </div>
            </div>
        </div>
    );
};

export default Profile;