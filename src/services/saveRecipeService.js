export async function saveRecipe(recipeId, token) {
    const response = await fetch("/api/savedrecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recipeId }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to save recipe");
    }
  
    return await response.json();
  }
  