import React, { useEffect, useContext } from 'react';
import axios from './axiosconfig'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../src/components/header'
import Home from '../src/components/homepage';
import GameRoom from '../src/components/gameRoom';
import Login from './components/loginPage';
import Signup from './components/signupPage';
import Profile from '../src/components/profilepage'
import ModeSelection from '../src/components/modeSelection';
import WaitingRoom from '../src/components/waitingRoom';
import Results from '../src/components/result';
import { useState } from 'react';
import { GlobalData } from './context/GlobalContext';



function App() {

  const { selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, userData, setUserData, results, setResults } = useContext(GlobalData);
  const [gameResults, setGameResults] = useState(null);

  const receiveGameResults = (results) => {
    setGameResults(results);
  };

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

    // const fetchSavedCategories = async () => {
    //     try {
    //         const response = await axios.get("api/categories");
    //         setSavedCategories(response.data);
    //     } catch (error) {
    //         console.log('Error fetching saved categories');
    //     }
    // };


    fetchUserData();
    // fetchGameData();

    //     fetchLeaderboardPosition("easy");
    //     fetchLeaderboardPosition("medium");
    //     fetchLeaderboardPosition("hard");
    // fetchSavedCategories();
}, [setUserData]);
  
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mode-selection" element={<ModeSelection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/results" element={<Results />}/>
            <Route path="/profile" element={<Profile userData={userData}/>} />
            <Route path="/singleplayer" element={<GameRoom />} />
            <Route path="/multiplayer" element={<WaitingRoom />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
