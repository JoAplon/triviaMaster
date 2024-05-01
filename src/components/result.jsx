import React from 'react';
import '../css/result.css';
import GameRoom from '../components/gameRoom';
import { Link, useNavigate } from 'react-router-dom';


const Results = ({ score, incorrectAnswers, difficulty, category }) => {

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handlePlayAgain = () => {
    navigate('/mode-selection', { state: { difficulty, category } });
    console.log('Starting a new game with the same settings...');

  }

  return (
    <div className='container'>
      <h2>Results: </h2>
      <div className='incorrectAnswers'>
      <h3>Score: {score} / 10</h3>
      <div className='incorrectAnswersList'>
      <ul>
      <p>Incorrect Answers:</p>
        {incorrectAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      </div>
      </div>
      <button className="playAgain" onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
}

export default Results;
