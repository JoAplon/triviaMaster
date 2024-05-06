import React, { useEffect, useContext, useState } from 'react';
import axios from './axiosconfig'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import './App.css';
import Header from '../src/components/header'
import Footer from './components/footer';
import Home from '../src/components/homepage';
import GameRoom from '../src/components/gameRoom';
import Login from './components/loginPage';
import Signup from './components/signupPage';
import Profile from '../src/components/profilepage';
import Results from './components/result'
// import ParticleComponent from './components/particles';
import { GlobalData } from './context/GlobalContext';
import Refresh from './components/refresh'
// import ModeSelection from '../src/components/modeSelection';
// import WaitingRoom from '../src/components/waitingRoom';



function App() {
  const { selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, userData, setUserData, results, setResults } = useContext(GlobalData);

  const receiveGameResults = (results) => {
    setGameResults(results);
  };

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            // console.log('Token:', token);
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const response = await axios.get("api/users/me", { headers });
            // console.log('Response data:', response.data);
            setUserData(response.data);
        } catch (error) {
            console.error.response.data('Error fetching user data.', error);
        }
    };


    fetchUserData();

}, [ setUserData]);

  
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
        {/* <ParticleComponent /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/mode-selection" element={<ModeSelection />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/results" element={<Results />}/>
            <Route path="/profile" element={<Profile userData={userData}/>} />
            <Route path="/game-room" element={<GameRoom />} />
            {/* <Route path="/multiplayer" element={<WaitingRoom />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
