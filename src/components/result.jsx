import React from 'react';
import '../css/result.css';
import { Link } from 'react-router-dom';


const Results = ({ score, incorrectAnswers, difficulty, categories }) => {


  const handlePlayAgain = () => {
    history.push({
      pathname: '/game-room',
      state: { difficulty, categories }
    });
    console.log('Starting a new game with the same settings...');
  
  }

  return (
    <div className='container'>
      <h2>Results</h2>
      <p>Score: {score}</p>
      <div className='incorrectAnswers'>
      <p>Incorrect Answers:</p>
      <div className='incorrectAnswersList'>
      <ul>
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
