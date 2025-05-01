import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fetchRecipes, deleteRecipe } from "../services/recipeService";
import { AppContext } from "../context/AppContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileSection from "../components/MyRecipe/ProfileSection";
import CategorySelector from "../components/CategorySelector";
import RecipeCard from "../components/RecipeCard";
import PaginationButton from "../components/PaginationButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function MyRecipe() {
  const { user, token } = useContext(AppContext);
  
  const isAdmin = user?.Roles?.includes("SuperAdmin");

  const navigate = useNavigate();

  // State to toggle between 'My Recipes' and 'Saved Recipes'
  const [viewMode, setViewMode] = useState("my");

  // All recipes fetched from the API
  const [recipes, setRecipes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load all recipes on mount
  useEffect(() => {
    const load = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    load();
  }, []);

  // Filter recipes based on current toggle and category
  const filteredRecipes = recipes.filter((recipe) => {
    const isOwnedByUser = recipe.UserId === user?.id;
    const isSavedByUser = user?.SavedRecipes?.some(
      (s) => s.RecipeId === recipe.RecipeId
    );

    const matchesView =
    viewMode === "my"
      ? isOwnedByUser
      : viewMode === "saved"
      ? isSavedByUser
      : viewMode === "create"
      ? false 
      : false;

    const matchesCategory =
      selectedCategory === "All" || recipe.Category === selectedCategory;

    return matchesView && matchesCategory;
  });

  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const profileImage = user?.profileImage || "/img/profile/profileDefault.jpg";

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar />

      <div className="container py-5">
        <ProfileSection
          user={user}
          profileImage={profileImage}
          isAdmin={isAdmin}
        />

        {/* Toggle Buttons */}
        <div className="container d-flex gap-4 my-3">
        <button
          onClick={() => setViewMode("my")}
          style={{
            padding: 12,
            backgroundColor:
              viewMode === "my"
                ? "var(--color-primary-orange)"
                : "transparent",
            color:
              viewMode === "my" ? "var(--color-bg)" : "var(--color-black)",
            border: "2px solid var(--color-primary-green)",
            borderRadius: 21,
            fontFamily: "var(--font-body)",
            fontSize: 18,
          }}
        >
          My Recipe
        </button>

        <button
          onClick={() => setViewMode("saved")}
          style={{
            padding: 12,
            backgroundColor:
              viewMode === "saved"
                ? "var(--color-primary-orange)"
                : "transparent",
            color:
              viewMode === "saved" ? "var(--color-bg)" : "var(--color-black)",
            border: "2px solid var(--color-primary-green)",
            borderRadius: 21,
            fontFamily: "var(--font-body)",
            fontSize: 18,
          }}
        >
          Saved Recipe
        </button>
          
          {/* create recipe */}
          <button
          onClick={() => {
            setViewMode("create");
            navigate("/create");
          }}
          style={{
            padding: 12,
            backgroundColor:
              viewMode === "create"
                ? "var(--color-primary-orange)"
                : "transparent",
            color:
              viewMode === "create" ? "var(--color-bg)" : "var(--color-black)",
            border: "2px solid var(--color-primary-green)",
            borderRadius: 21,
            fontFamily: "var(--font-body)",
            fontSize: 18,
          }}
        >
          Create Recipe
        </button>
        </div>

        {/* {viewMode !== "create" && (
        <> */}

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
                onDelete={async (id) => {
                  console.log("🗑️ Attempting to delete RecipeId:", id);
                  console.log("🔐 Token:", token);
                
                  if (window.confirm("Are you sure you want to delete this recipe?")) {
                    try {
                      const result = await deleteRecipe(id, token);
                      console.log("✅ Backend response:", result.message);
                
                      setRecipes((prev) => prev.filter((r) => r.RecipeId !== id));
                      alert("Recipe deleted successfully!");
                    } catch (err) {
                      console.error("🔥 Error deleting recipe:", err);
                      alert(`Failed to delete recipe: ${err.message}`);
                    }
                  }
                }}
                
              />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>

        {filteredRecipes.length > 0 && (
          <div
            className="container mt-4"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
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
                color: "black",
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              Page {currentPage} of {totalPages}
            </div>

            <div style={{ marginLeft: "auto" }}>
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
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
