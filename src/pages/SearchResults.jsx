import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../services/recipeService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query")?.toLowerCase() ?? "";

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilteredRecipes() {
      try {
        const allRecipes = await fetchRecipes();

        const results = allRecipes.filter((recipe) =>
          recipe.Name.toLowerCase().includes(searchTerm)
        );

        setFilteredRecipes(results);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFilteredRecipes();
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar />

      <div className="container py-5">
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          Search Results for: <em>{searchTerm}</em>
        </h2>

        {loading ? (
          <p>Loading recipes...</p>
        ) : filteredRecipes.length > 0 ? (
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.RecipeId} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
