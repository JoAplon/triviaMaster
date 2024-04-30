import React from 'react';
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


function App() {

  
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/singleplayer" element={<GameRoom />} />
            <Route path="/multiplayer" element={<WaitingRoom />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
