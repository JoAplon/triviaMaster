import axios from 'axios';

export const getTriviaQuestions = async (amount = 10, selectedCategory, selectedDifficulty, type = 'multiple') => {
  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${type}&encode=url3986`);
    console.log (response.data)
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};


export const getTriviaCategories = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    return response.data.trivia_categories;
  } catch (error) {
    console.error('Error fetching trivia categories:', error);
    throw error;
  }
};