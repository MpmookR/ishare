import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { fetchRecipes, deleteRecipe } from "../services/recipeService";
import { fetchSavedRecipes } from "../services/savedService";
import { AppContext } from "../context/AppContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileSection from "../components/MyRecipe/ProfileSection";
import CategorySelector from "../components/CategorySelector";
import RecipeCard from "../components/RecipeCard";
import PaginationButton from "../components/PaginationButton";

export default function MyRecipe() {
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [viewMode, setViewMode] = useState("my");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataVersion, setDataVersion] = useState(0); // Triggers reload of data
  const recipesPerPage = 10;

  const isAdmin = user?.roles?.includes("SuperAdmin");
  const profileImage = user?.profileImage || "/img/profile/profileDefault.jpg";

   // Refresh handler: used after save/unsave
   const refreshData = useCallback(() => {
    setDataVersion((v) => v + 1);
  }, []);

 // Fetches recipe list and matches them with saved ones
 useEffect(() => {
  const load = async () => {
    try {
      const allRecipes = await fetchRecipes();
      let savedRecipeRefs = [];

      if (user?.Id && token) {
        savedRecipeRefs = await fetchSavedRecipes(user.Id, token);
      }

      const recipesWithSavedState = allRecipes.map((r) => {
        const match = savedRecipeRefs.find((s) => s.RecipeId === r.RecipeId);
        return {
          ...r,
          defaultSaved: !!match, // used by LikeSavedActions
          SavedRecipeId: match?.SavedRecipeId || null, // for unsave
        };
      });

      setRecipes(recipesWithSavedState);
      setSavedRecipeIds(savedRecipeRefs.map((s) => s.RecipeId)); // used for filtering
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  load();
}, [dataVersion, user?.Id, token]); // reloads when refreshData is triggered
  
  // View filter logic
  const filteredRecipes = recipes.filter((recipe) => {
    const isOwned = recipe.UserId === user?.Id;
    const isSaved = savedRecipeIds.includes(recipe.RecipeId);

    const matchesView =
      viewMode === "my" ? isOwned : viewMode === "saved" ? isSaved : false;

    const matchesCategory =
      selectedCategory === "All" || recipe.Category === selectedCategory;

    return matchesView && matchesCategory;
  });

  // Pagination logic
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  // Recipe deletion
  const handleDelete = async (recipeId) => {
    if (!token) return alert("Unauthorized.");

    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const result = await deleteRecipe(recipeId, token);
        console.log("Deleted:", result.message);
        setRecipes((prev) => prev.filter((r) => r.RecipeId !== recipeId));
      } catch (err) {
        console.error("Deletion error:", err);
        alert(`Failed to delete recipe: ${err.message}`);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar />

      <div className="container py-5">
        {/* Profile Header */}
        <ProfileSection
          user={user}
          profileImage={profileImage}
          isAdmin={isAdmin}
        />

        {/* View Toggle Buttons */}
        <div className="container d-flex gap-4 my-3">
          {["my", "saved", "create"].map((mode) => (
            <button
              key={mode}
              onClick={() =>
                mode === "create" ? navigate("/create") : setViewMode(mode)
              }
              style={{
                padding: 12,
                backgroundColor:
                  viewMode === mode
                    ? "var(--color-primary-orange)"
                    : "transparent",
                color:
                  viewMode === mode ? "var(--color-bg)" : "var(--color-black)",
                border: "2px solid var(--color-primary-green)",
                borderRadius: 21,
                fontFamily: "var(--font-body)",
                fontSize: 18,
              }}
            >
              {mode === "my"
                ? "My Recipe"
                : mode === "saved"
                ? "Saved Recipe"
                : "Create Recipe"}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="container">
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Recipe Cards */}
        <div className="container my-4 d-flex flex-wrap gap-4 justify-content-center">
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.RecipeId}
                recipe={recipe}
                showDelete={viewMode === "my"}
                onDelete={handleDelete}
                onSaveToggle={refreshData} //Trigger refresh after unsave/save
              />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>

        {/* Pagination */}
        {filteredRecipes.length > 0 && (
          <div className="container mt-4 d-flex justify-content-between align-items-center flex-wrap gap-4">
            <PaginationButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              icon={<FaArrowLeft size={24} />}
              text="Back"
            />
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Page {currentPage} of {totalPages}
            </div>
            <PaginationButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              icon={<FaArrowRight size={24} />}
              text="Next"
              reverse
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}