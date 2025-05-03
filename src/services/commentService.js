import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Create a new comment
export const addComment = async (commentDTO, token) => {
  const res = await axios.post(`${API_URL}/comments`, commentDTO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.comment; // server wraps it in { message, comment }
};

// Delete a comment by ID
export const deleteComment = async (commentId, token) => {
  const res = await axios.delete(`${API_URL}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.message;
};

// export const fetchCommentsByRecipeId = async (recipeId) => {
//     const res = await axios.get(`${API_URL}/comments/recipe/${recipeId}`);
//     return res.data.comments || res.data.Comments || []; 
//   };
