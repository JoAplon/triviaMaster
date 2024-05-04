import {createContext, useState} from 'react'
export const GlobalData = createContext()

export default function GlobalContext({ children }) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [ selectedDifficulty, setSelectedDifficulty] = useState([])
    const [userData, setUserData] = useState(null); // Add userData state
    const [ score, setScore ] = useState(0);
    const [triviaData, setTriviaData] = useState([]);
    const [ results, setResults ] = useState([]);


    const handleSelectedCategory = (category) => {
      setSelectedCategory(category)
    };

    const handleSelectedDifficulty = (difficulty) => {
      setSelectedDifficulty(difficulty)
    };

    const handleUserData = (data) => {
      setUserData(data);
  };

    const data = {
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        userData,
        setUserData,
        score,
        setScore,
        triviaData,
        setTriviaData,
        results,
        setResults
    }
  return <GlobalData.Provider value={data}> { children } </GlobalData.Provider>
}
