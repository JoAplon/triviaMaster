import React, { useState, useEffect } from 'react';
import TriviaQuestion from './triviaQuestions';
import SubmitAnswerButton from './submitAnswerButton';
import Results from './result';
import { getTriviaQuestions } from '../utils/triviaAPI'; // Correct import path
import '../styles/gameRoom.css';

const GameRoom = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [triviaData, setTriviaData] = useState([]);

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const questions = await getTriviaQuestions(); // Fetch trivia questions
        setTriviaData(questions); // Update state with fetched questions
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
        // Handle errors here (e.g., show an error message)
      }
    };

    fetchTrivia(); // Call the function when component mounts
  }, []);

  const handleAnswerSubmit = (selectedOption) => {
    const currentTriviaQuestion = triviaData[currentQuestionIndex];
    if (!currentTriviaQuestion) {
      // Handle the case where currentTriviaQuestion is undefined
      return;
    }
    
    const correctAnswer = currentTriviaQuestion.correctAnswer;
    const isCorrect = selectedOption === correctAnswer;
  
    const updatedAnswers = [...userAnswers, { question: currentTriviaQuestion.question, answer: selectedOption, isCorrect }];
    setUserAnswers(updatedAnswers);
  
    if (isCorrect) {
      setScore(score + 1);
    }
  
    if (currentQuestionIndex === triviaData.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };  

  const handleOptionSelect = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
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
            question={triviaData[currentQuestionIndex]?.question}
            options={triviaData[currentQuestionIndex]?.options}
            onOptionSelect={handleOptionSelect}
          />
          <SubmitAnswerButton onSubmit={handleAnswerSubmit} />
        </div>
      )}
    </div>
  );
};

export default GameRoom;
