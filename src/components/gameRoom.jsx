import React, { useState } from 'react';
import TriviaQuestion from './triviaQuestions';
import SubmitAnswerButton from './submitAnswerButton';
import Results from './result';
import triviaData from '../mockData';
import '../styles/gameRoom.css'

const GameRoom = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);


  const handleAnswerSubmit = (selectedOption) => {
    const correctAnswer = triviaData[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;
  
    // Update user answers
    const updatedAnswers = [...userAnswers, { question: triviaData[currentQuestionIndex].question, answer: selectedOption, isCorrect }];
    setUserAnswers(updatedAnswers);
  
    // Update score if the answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }
    console.log('Is correct:', isCorrect);
    console.log('Correct answer:', correctAnswer);
    console.log('Selected option:', selectedOption);
      
    // Check if it's the last question to show results
    if (currentQuestionIndex === triviaData.length - 1) {
      setShowResults(true);
      console.log('Score:', score);
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };  

  const handleOptionSelect = (selectedOption) => {
    // Handle option selection logic here
    console.log('Selected Option:', selectedOption);
    // You can add more logic here as needed
  };

  return (
    <div className="GameRoom">
      {showResults ? (
        <Results
          score={userAnswers.filter(answer => answer.isCorrect).length}
          incorrectAnswers={userAnswers.filter(answer => !answer.isCorrect).map(answer => answer.question)}
        />
      ) : (
        <div>
          <TriviaQuestion
            question={triviaData[currentQuestionIndex].question}
            options={triviaData[currentQuestionIndex].options}
            onOptionSelect={handleOptionSelect}
          />
          <SubmitAnswerButton onSubmit={handleAnswerSubmit} />
        </div>
      )}
    </div>
  );
}

export default GameRoom;
