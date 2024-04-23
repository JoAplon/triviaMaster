import React from 'react';

const Results = ({ score, incorrectAnswers }) => {
  return (
    <div>
      <h2>Results</h2>
      <p>Score: {score}</p>
      <p>Incorrect Answers:</p>
      <ul>
        {incorrectAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
