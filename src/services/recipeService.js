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


/**
 * Create a new recipe (requires token)
 */
export const createRecipe = async (recipeData, token) => {
  try {
    console.log("📝 Creating recipe with data:", recipeData);
    const response = await api.post('/Recipes', recipeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    console.log("Recipe created:", response.data);
    return response.data;
  } catch (err) {
    console.error('createRecipe failed:', err.message, err.response);
    throw new Error(err.response?.data?.message || 'Failed to create recipe.');
  }
};


export const fetchRecipeById = async (id) => {
  console.log("Fetching recipe ID:", id);
  const response = await api.get(`/Recipes/${id}`);
  return response.data;
};

export const deleteRecipe = async (recipeId, token) => {
  try {

    console.log("🔑 Token being sent:", token); // Add this line
    console.log("🔗 Endpoint:", `/Recipes/${recipeId}`); // Add this line

    const response = await api.delete(`/Recipes/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Delete response:", response);
    return response.data;
  } catch (err) {
    console.error("❌ deleteRecipe failed:", err.message);
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else if (err.request) {
      console.error("Request sent but no response:", err.request);
    } else {
      console.error("Unexpected error:", err);
    }
    throw new Error(err.response?.data?.message || "Failed to delete recipe.");
  }
};




// You can later add createRecipe, deleteRecipe, etc. here
