import React from 'react';

const TriviaQuestion = ({ question, options = [], onOptionSelect }) => {
  return (
    <div className="question">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onOptionSelect(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TriviaQuestion;
