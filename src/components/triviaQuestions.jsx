// triviaQuestions.jsx
import React, { useEffect } from 'react';

const TriviaQuestion = ({ question, options = [], onOptionSelect }) => {
  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <div className="triviaQuestion">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className="option"
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TriviaQuestion;
