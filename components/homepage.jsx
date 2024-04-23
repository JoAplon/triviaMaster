// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to the Trivia Game!</h2>
      <p>Click the button below to enter the game room.</p>
      <Link to="/game-room">
        <button>Enter Game Room</button>
      </Link>
    </div>
  );
}

export default Home;
