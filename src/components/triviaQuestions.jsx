import React, { useState } from 'react';

const TriviaQuestion = ({ question, options, onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onOptionSelect(option);
  };
  
  return (
    <div className="TriviaQuestion">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleOptionSelect(option)}>{option}</button>
        ))}
      </div>
    </div>
  );
}

export default TriviaQuestion;
