// src/services/recipeService.js
import api from './api';

export const fetchRecipes = async () => {
  try {
    const response = await api.get('/Recipes'); 
    console.log('API Response:', response);
    return response.data;
  } catch (err) {
    console.error('fetchRecipes failed:', err.message, err.response);
    throw err;
  }
};

// You can later add createRecipe, deleteRecipe, etc. here
