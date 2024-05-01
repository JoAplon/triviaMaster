import {createContext, useState} from 'react'
export const GlobalData = createContext()

export default function GlobalContext({ children }) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [ selectedDifficulty, setSelectedDifficulty] = useState([])

    const handleSelectedCategory = (category) => {
      setSelectedCategory(category)
    };

    const handleSelectedDifficulty = (difficulty) => {
      setSelectedDifficulty(difficulty)
    };

    const data = {
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty
    }
  return <GlobalData.Provider value={data}> { children } </GlobalData.Provider>
}
