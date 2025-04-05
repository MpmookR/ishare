//31 march at 52.55
import api from '../api';

export const getRecipes = async () => {
  const res = await api.get('/recipes');
  return res.data;
};

export const postRecipe = async (recipeData) => {
  const res = await api.post('/recipes', recipeData);
  return res.data;
};
