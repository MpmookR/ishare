import api from './api';

export const fetchSavedRecipes = async (userId, token) => {
  try {
    const response = await api.get(`/SavedRecipes/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Must be exact
      },
    });
    return response.data;
  } catch (err) {
    console.error("fetchSavedRecipes failed:", err.message, err.response);
    throw new Error(err.response?.data?.message || "Failed to fetch saved recipes.");
  }
};

// Save a recipe
export const saveRecipe = async (recipeId, token) => {

  console.log("Sending saveRecipe:", {
    url: "/SavedRecipes",
    body: { recipeId },
    token,
  });

  try {
    const response = await api.post(
      "/SavedRecipes",
      { recipeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // add explicitly
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("saveRecipe failed:", err.message, err.response);
    throw new Error(
      err.response?.data?.message || "Failed to save recipe."
    );
  }
};


// Unsave a recipe
export const deleteSavedRecipe = async (savedRecipeId, token) => {
  try {
    const response = await api.delete(`/SavedRecipes/${savedRecipeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("deleteSavedRecipe failed:", err.message, err.response);
    throw new Error(err.response?.data?.message || "Failed to unsave recipe.");
  }
};
