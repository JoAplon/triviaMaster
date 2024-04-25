// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import DifficultyMenu from '../components/difficultyMenu';
import CategoryMenu from '../components/categoryMenu';
import Leaderboard from '../components/leaderboard';

const Home = () => {

  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);

  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const handleToggleCategoryMenu = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };

  const handleToggleDifficultyMenu = () => {
    console.log("Toggling difficulty menu...");
    setShowDifficultyMenu(!showDifficultyMenu);
  };

  const handleDifficultySelect = (difficulty) => {
    console.log('Selected difficulty:', difficulty);
    // Handle the selection logic here
};


  const [leaderboardData, setLeaderboardData] = useState([
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 90 },
    { name: 'Player 3', score: 80 },
    // Add more players as needed
  ]);

  useEffect(() => {
    // Simulate leaderboard data update
    const intervalId = setInterval(() => {
      const updatedLeaderboard = leaderboardData.map((player) => ({
        ...player,
        // score: player.score + Math.floor(Math.random() * 10),
      }));
      setLeaderboardData(updatedLeaderboard);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [leaderboardData]);


  return (
    <div className="home">
      <Header />
      <h1>Trivia Mind Meld</h1>
      <h2>The Best Trivia Game Around!</h2>
      <Link to="/game-room">
        <button>Enter Game Room</button>
      </Link>
      <div className='buttonContainer'>

      <button className='diffButton' onClick={handleToggleDifficultyMenu}>Difficulty</button>
      <button className='catButton' onClick={handleToggleCategoryMenu}>Category</button>
      </div>
      {showDifficultyMenu && <DifficultyMenu difficulties={['Easy', 'Medium', 'Hard']} onSelect={handleDifficultySelect} onClose={() => setShowDifficultyMenu(false)} />}
      {showCategoryMenu && <CategoryMenu onClose={() => setShowCategoryMenu(False)} />}

      <Leaderboard leaderboardData={leaderboardData} />

    </div>


  );
}

export default Home;
