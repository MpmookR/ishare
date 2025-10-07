import api from "./api"; //  Axios instance

export const likeRecipe = async (recipeId, token) => {
  try {
    const response = await api.post(
      "/Likes",
      { recipeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.like;
  } catch (error) {
    console.error("likeRecipe failed:", error);
    throw new Error(error.response?.data?.message || "Failed to like recipe.");
  }
};

export const unlikeRecipe = async (recipeId, userId, token) => {
  try {
    const response = await api.delete(`/Likes/recipe/${recipeId}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("unlikeRecipe failed:", error);
    throw new Error(error.response?.data?.message || "Failed to unlike recipe.");
  }
};
