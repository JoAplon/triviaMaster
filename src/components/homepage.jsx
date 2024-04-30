import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import DifficultyMenu from './difficultyMenu';
import CategoryMenu from './categoryMenu';
import Leaderboard from './leaderboard';
import GameRoom from '../components/gameRoom';
import axios from '../axiosconfig';
import { GlobalData } from '../context/GlobalContext';

const Home = () => {
  const {selectedCategory, setSelectedCategory} = useContext(GlobalData);
  const {selectedDifficulty, setSelectedDifficulty} = useContext(GlobalData);
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);


  const [leaderboardData, setLeaderboardData] = useState([
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 90 },
    { name: 'Player 3', score: 80 },
    // Add more players as needed
  ]);

  useEffect(() => {
  console.log(selectedCategory)
  }, [selectedCategory])
  

  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  

  const handleToggleCategoryMenu = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };

  const handleToggleDifficultyMenu = () => {
    // console.log("Toggling difficulty menu...");
    setShowDifficultyMenu(!showDifficultyMenu);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    localStorage.setItem('selectedDifficulty', difficulty); // Save to local storage
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category); // Save to local storage
  };

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
      <Link to="/mode-selection">
        <button>Enter Game Room</button>
      </Link>
      <div className='buttonContainer'>

        <button className='diffButton' onClick={handleToggleDifficultyMenu}>Difficulty</button>
        <button className='catButton' onClick={handleToggleCategoryMenu}>Category</button>
      </div>
      {showDifficultyMenu && <DifficultyMenu difficulties={['easy', 'medium', 'hard']} onSelect={handleDifficultySelect} onClose={() => setShowDifficultyMenu(false)} />}
      {showCategoryMenu && <CategoryMenu onSelect={handleCategorySelect} onClose={() => setShowCategoryMenu(false)} />}

      <Leaderboard leaderboardData={leaderboardData} />
      {/* {selectedCategory && selectedDifficulty && <GameRoom selectedCategory={selectedCategory} selectedDifficulty={selectedDifficulty} />} */}
      
    </div>


  );
}

export default Home;
