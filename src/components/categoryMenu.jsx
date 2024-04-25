import React, { useState, useEffect } from 'react';

const CategoryMenu = ({ onClose }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch('API_ENDPOINT/categories');
        const data = await response.json();
        setCategories(data.categories); // Assuming the API response contains an array of category objects
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run only once on component mount

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDone = () => {
    // Handle the selected categories (e.g., pass them to another component or store them in state)
    console.log('Selected categories:', selectedCategories);
    onClose();
  };

  return (
    <div className="category-menu">
      <h3>Choose Categories:</h3>
      {categories.map((category) => (
        <label key={category.id}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
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
