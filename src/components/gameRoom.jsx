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
  const [selectedOption, setSelectedOption] = useState("")

  
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

  const handleAnswerSubmit = () => {
    console.log(selectedOption);
    const currentTriviaQuestion = triviaData[currentQuestionIndex];
    if (!currentTriviaQuestion) {
      // Handle the case where currentTriviaQuestion is undefined
      return;
    }

    const correctAnswer = currentTriviaQuestion.correct_answer;
    console.log(currentTriviaQuestion);
    const isCorrect = selectedOption === correctAnswer;
    console.log(isCorrect);

    const updatedAnswers = [...userAnswers, { question: currentTriviaQuestion.question, answer: selectedOption, isCorrect }];
    setUserAnswers(updatedAnswers);

    // Update the score using the functional form of setScore
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex === triviaData.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleOptionSelect = (Option) => {
    console.log('Selected Option:', Option);
    setSelectedOption(Option)
  };

  return (
    <div className="GameRoom">
      {showResults ? (
        <Results
          score={score} // Update to display the total score
          incorrectAnswers={userAnswers.filter(answer => !answer.isCorrect).map(answer => answer.question)}
        />
      ) : (
        <div>
          <TriviaQuestion
            question={triviaData[currentQuestionIndex]?.question}
            options={triviaData[currentQuestionIndex]?.incorrect_answers.concat(triviaData[currentQuestionIndex]?.correct_answer)}
            onOptionSelect={handleOptionSelect}
          />
          <SubmitAnswerButton onSubmit={handleAnswerSubmit} />
        </div>
      )}
    </div>
  );
};

export default GameRoom;
