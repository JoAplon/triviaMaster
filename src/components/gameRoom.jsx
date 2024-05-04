import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TriviaQuestion from './triviaQuestions';
import SubmitAnswerButton from './submitAnswerButton';
import Results from './result';
import { getTriviaQuestions } from '../utils/triviaAPI'; // Correct import path
import '../css/gameRoom.css';
import { GlobalData } from '../context/GlobalContext';

const GameRoom = () => {
  const { selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, userData, setUserData, score, setScore, triviaData, setTriviaData } = useContext(GlobalData);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  // const [score, setScore] = useState(0);
  // const [triviaData, setTriviaData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("")

  useEffect(() => {
    console.log('Selected Category: ', selectedCategory);
  }, [selectedCategory])


  useEffect(() => {
    console.log('Selected Difficulty:', selectedDifficulty);
    const fetchTrivia = async () => {
      try {

        const questions = await getTriviaQuestions(10, selectedCategory, selectedDifficulty); // Fetch trivia questions
        const decodedQuestions = questions.map(question => {
          // Decode the question text and return the decoded object
          const decodedQuestion = decodeURIComponent(question.question);
          const decodedChoices = question.incorrect_answers.map(choice => decodeURIComponent(choice));
          const decodedCorrectAnswer = decodeURIComponent(question.correct_answer);
          return {
            ...question,
            question: decodedQuestion,
            incorrect_answers: decodedChoices,
            correct_answer: decodedCorrectAnswer
          };
        });
        setTriviaData(decodedQuestions);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      }
    };

    fetchTrivia(); // Call the function when component mounts
  }, [selectedCategory, selectedDifficulty]);


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


  const navigate = useNavigate();

  useEffect(() => {
    if (showResults === false ) return
    const incorrectAnswers =  userAnswers.filter(answer => !answer.isCorrect).map(answer => answer.question)
    const state = {
      // score: score,
      incorrectAnswers: incorrectAnswers, 
      // incorrectAnswers: userAnswers,
      // difficulty: selectedDifficulty,
      // category: selectedCategory,
      // userId: userData?._id
    };

    navigate('/results', { state });
  }, [ showResults]);



  return (
    <div className="GameRoom">
      {/* {showResults ? (
        <Results
          category={selectedCategory}
          difficulty={selectedDifficulty}
          questions={triviaData}
          score={score} 
          incorrectAnswers={userAnswers.filter(answer => !answer.isCorrect).map(answer => answer.question)}
        />
      ) : ( */}
      <div>
        <TriviaQuestion
          question={triviaData[currentQuestionIndex]?.question}
          options={triviaData[currentQuestionIndex]?.incorrect_answers.concat(triviaData[currentQuestionIndex]?.correct_answer)}
          onOptionSelect={handleOptionSelect}
        />
        <SubmitAnswerButton onSubmit={handleAnswerSubmit} />
      </div>
      {/* )} */}
    </div>
  );
};

export default GameRoom;
