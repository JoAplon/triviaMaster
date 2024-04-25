import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../src/components/header'
import Home from '../src/components/homepage';
import GameRoom from '../src/components/gameRoom';

function App() {

  
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game-room/*" element={<GameRoom />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
