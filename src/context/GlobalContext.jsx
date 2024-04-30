import {createContext, useState} from 'react'
export const GlobalData = createContext()

export default function GlobalContext({ children }) {
    const [selectedCategory, setSelectedCategory] = useState([])
    const handleSelectedCategory = (category) => {
      setSelectedCategory(category)
    } 
    const data = {
        selectedCategory,
        setSelectedCategory
    }
  return <GlobalData.Provider value={data}> { children } </GlobalData.Provider>
}
