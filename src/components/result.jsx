import React, { useEffect, useState, useContext } from 'react';
import '../css/result.css';
import GameRoom from '../components/gameRoom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GlobalData } from '../context/GlobalContext';
import Profile from './profilepage';
import axios from 'axios';


const Results = () => {

  const { selectedCategory, selectedDifficulty, userData, score, triviaData, results, setResults } = useContext(GlobalData);

  const location = useLocation();
  const { incorrectAnswers } = location.state;


  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/game-room', { state: { selectedDifficulty, selectedCategory } });
    console.log('Starting a new game with the same settings...');

  }

  useEffect(() => {
    console.log(triviaData);
    console.log(userData);
    console.log(incorrectAnswers);
    console.log(results);
  }, [])

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  useEffect(() => {

    if (!userData) return
    const sendResults = async () => {

      try {
        const response = await axios.post('api/games/results', {
          userId: userData._id,
          category: selectedCategory[0],
          difficulty: selectedDifficulty,
          questions: triviaData
        });


        if (response.status === 201) {
          console.log('Game results saved successfully:', response.data);
          // navigate('/mode-selection', { state: { difficulty, category } });
        } else {
          console.error('Failed to save game results:', response.data);
        }
      } catch (error) {
        console.error('Error saving game results:', error);
      }
    }

    sendResults();
  }, [userData]);





  return (
    <div className='container'>
      <h2>Results: </h2>
      <div className='incorrectAnswers'>
        <h3>Score: {score} / 10</h3>
        <div className='incorrectAnswersList'>
          <ul>
            <p>Incorrect Answers:</p>
            {incorrectAnswers?.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className="playAgain" onClick={handlePlayAgain}>Play Again</button>

      <div>

        {/* {results.map((result, index) => (
          <div key={index}>
            <p>Difficulty: {result.difficulty}</p>
            <p>Category: {result.category}</p>
            <p>Question: {result.question}</p>
          </div>
        ))} */}


        {userData ? (
          <Link
            to={{
              pathname: '/profile',
              // state: { score, questions, difficulty, category, userId }
            }}
          >
            <button>Go to Profile</button>
          </Link>
        ) : (
          <Link to="/">
            <button>Go to Home</button>
          </Link>
        )}

      </div>
    </div>
  );
}

export default Results;
