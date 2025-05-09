import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { fetchRecipes } from "../services/recipeService";
import { fetchSavedRecipes } from "../services/savedService";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import HighlightCard from "../components/HighlightCard";
import CategorySelector from "../components/CategorySelector";
import RecipeCard from "../components/RecipeCard";
import PaginationButton from "../components/PaginationButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function HomePage() {
  const { user, token, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [dataVersion, setDataVersion] = useState(0); // triggers re-fetch
  const refreshData = useCallback(() => {
    setDataVersion((v) => v + 1);
  }, []);
  

  // Filtered recipes pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  // Apply filtering first
  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((r) => r.Category === selectedCategory);

  // pagination
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const recipesData = await fetchRecipes();
        setRecipes(recipesData);

        const sortedByLikes = [...recipesData].sort(
          (a, b) => (b.likeCount || 0) - (a.likeCount || 0)
        );
        setFeaturedRecipes(sortedByLikes.slice(0, 6));

        if (user && token) {
          const savedData = await fetchSavedRecipes(user.Id, token);
          setSavedRecipes(savedData);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData();
  }, [user, token, dataVersion]);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar />

      <HeroSection />

      {/* Featured Section */}
      {featuredRecipes.length > 0 && (
        <section className="container my-5">
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-h2)",
            }}
            className="mb-4"
          >
            Featured Recipe
          </h2>

          <div
            className="p-4"
            style={{
              background: "var(--color-primary-orange)",
              borderRadius: "21px",
              outline: "1px solid black",
              outlineOffset: "-1px",
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              gap: "20px",
              paddingBottom: "16px",
            }}
          >
            {featuredRecipes.map((r, index) => (
              <HighlightCard
                key={`${r.RecipeId}-${index}`}
                recipe={{
                  ...r,
                  defaultSaved: r.SavedRecipes?.some(
                    (sr) => sr.UserId === user.Id
                  ),
                  SavedRecipeId: r.SavedRecipes?.find(
                    (sr) => sr.UserId === user.Id
                  )?.SavedRecipeId,
                  likedByCurrentUser: r.Likes?.some((l) => l.UserId === user.Id),
                }}
                onSaveToggle={refreshData}
                onLikeToggle={refreshData}
                variant={index % 2 !== 0 ? "green" : "blue"}
              />
            ))}
          </div>
        </section>
      )}

      <section className="container my-5">
        <div>
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelect={(cat) => setSelectedCategory(cat)}
          />
        </div>
      </section>

      {/* Recipe section */}
      <section className="container my-5">
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-h2)",
          }}
        >
          {selectedCategory} Recipes
        </h2>

        {filteredRecipes.length === 0 ? (
          <p>No recipes found for "{selectedCategory}".</p>
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
              {currentRecipes.map((r) => (
                <RecipeCard
                  key={r.RecipeId}
                  recipe={{
                    ...r,
                    defaultSaved: r.SavedRecipes?.some(
                      (sr) => sr.UserId === user.Id
                    ),
                    SavedRecipeId: r.SavedRecipes?.find(
                      (sr) => sr.UserId === user.Id
                    )?.SavedRecipeId,
                    likedByCurrentUser: r.Likes?.some((l) => l.UserId === user.Id),
                  }}
                  onSaveToggle={refreshData} //refresh callback
                  onLikeToggle={refreshData}
                />
              ))}
            </div>

            {/* Pagination Controls */}
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
              {/* Previous */}
              <PaginationButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                icon={<FaArrowLeft size={24} />}
                text="Back"
              />

              {/* Page number */}
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

              {/* Next */}
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
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
