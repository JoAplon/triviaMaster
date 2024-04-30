import React, { useState, useEffect, useContext } from 'react';
import { getTriviaCategories } from '../utils/triviaAPI';
import { GlobalData } from '../context/GlobalContext';


const CategoryMenu = ({ onClose }) => {
  const {selectedCategory, setSelectedCategory} = useContext(GlobalData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const triviaCategories = await getTriviaCategories();
        setCategories(triviaCategories); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run only once on component mount

  // const [selectedCategory, setSelectedCategory] = useState([]);

  // adds the category to the array when selected and removes when selected again
  const handleCategoryChange = (category) => {
    if (selectedCategory?.includes(category)) {
      setSelectedCategory(selectedCategory.filter((element) => element !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const handleDone = () => {
    // closes the category menu and console.logs the selections
    console.log('Selected categories:', selectedCategory);
    onClose();
  };

  return (
    <div className="category-menu">
      <h3>Choose Categories:</h3>
      {categories.map((category) => (
        <label key={category.id}>
          <input
            type="checkbox"
            checked={selectedCategory?.includes(category.id)}
            onChange={() => handleCategoryChange(category.id)}
          />
          {category.name}
        </label>
      ))}
      <button onClick={handleDone}>Done</button>
    </div>
  );
};

export default CategoryMenu;
