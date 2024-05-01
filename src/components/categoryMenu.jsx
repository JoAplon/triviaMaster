import React, { useState, useEffect, useContext } from 'react';
import { getTriviaCategories } from '../utils/triviaAPI';
import { GlobalData } from '../context/GlobalContext';
import '../css/CategoryMenu.css'; // Import the CSS file

const CategoryMenu = ({ onClose }) => {
  const {selectedCategory, setSelectedCategory} = useContext(GlobalData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const triviaCategories = await getTriviaCategories();
        setCategories(triviaCategories); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategory(selected);
  };

  const handleDone = () => {
    console.log('Selected categories:', selectedCategory);
    onClose();
  };

  return (
    <div className="category-menu">
      <h3>Choose Categories:</h3>
      <select
        multiple
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="dropdown-menu"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleDone}>Done</button>
    </div>
  );
};

export default CategoryMenu;
