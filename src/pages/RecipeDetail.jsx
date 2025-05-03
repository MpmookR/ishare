import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useCallback } from "react";
import { fetchRecipeById } from "../services/recipeService";
import { fetchSavedRecipes } from "../services/savedService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LikeSavedActions from "../components/LikeSavedAction";
import { AppContext } from "../context/AppContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  const [dataVersion, setDataVersion] = useState(0); // used to trigger refresh

  const refreshData = useCallback(() => {
    setDataVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await fetchRecipeById(id);

        let savedRecipeRefs = [];
        if (user?.Id && token) {
          savedRecipeRefs = await fetchSavedRecipes(user.Id, token);
        }

        const match = savedRecipeRefs.find(
          (s) => s.RecipeId === data.RecipeId
        );

        const likedByCurrentUser =
          Array.isArray(data.Likes) && user?.Id
            ? data.Likes.some((l) => l.UserId === user.Id)
            : false;

        setRecipe({
          ...data,
          defaultSaved: !!match,
          SavedRecipeId: match?.SavedRecipeId || null,
          likedByCurrentUser,
        });
      } catch (error) {
        console.error("Error fetching recipe by ID:", error);
      }
    }

    loadRecipe();
  }, [id, user?.Id, token, dataVersion]);

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div className="container py-5" style={{ flex: 1 }}>
      {/* img + intro */}
        <div
          className="d-flex gap-5"
          style={{
            minHeight: 300,
            maxHeight: 500,
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          {/* Left Column: Image */}
          <div style={{ flex: "1 1 50%" }}>
            <img
              src={recipe.Image || "https://placehold.co/635x435"}
              alt={recipe.Name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 21,
                border: "1.5px solid black",
              }}
            />
          </div>

          {/* Right Column: Text Content */}
          <div
            style={{
              flex: "1 1 50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="d-flex flex-column gap-4">
              <h2
                style={{
                  fontSize: 48,
                  fontStyle: "italic",
                  fontFamily: "EB Garamond",
                  fontWeight: 700,
                  lineHeight: "58px",
                  marginBottom: 0,
                }}
              >
                {recipe.Name}
              </h2>

              <p
                style={{
                  fontSize: 24,
                  fontFamily: "EB Garamond",
                  lineHeight: "32px",
                  marginBottom: 0,
                }}
              >
                {recipe.Intro || "No description provided."}
              </p>
            </div>

            {/* Bottom: Post by + Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 20,
                fontFamily: "EB Garamond",
                marginTop: 24,
              }}
            >
              <div>
                Post by <strong>@{recipe.UserName || "anonymous user"}</strong>
              </div>

              <LikeSavedActions
                recipeId={recipe.RecipeId}
                savedRecipeId={recipe.SavedRecipeId}
                defaultSaved={recipe.defaultSaved}
                likedByCurrentUser={recipe.likedByCurrentUser}
                onSaveToggle={refreshData}
                onLikeToggle={refreshData}
                iconColor="var(--color-black)"
                iconSize={24}
              />
            </div>
          </div>
        </div>

        <div className="row mt-5">
          {/* Ingredients */}
          <div className="col-md-6">
            <div
              style={{
                backgroundColor: "#FFF7E6",
                padding: 24,
                borderRadius: 16,
                border: "1.5px solid var(--color-primary-orange)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                height: "100%",
              }}
            >
              <h4
                style={{
                  backgroundColor: "var(--color-primary-orange)",
                  padding: "6px 12px",
                  color: "white",
                  borderRadius: 12,
                  fontFamily: "EB Garamond",
                  fontSize: 20,
                  fontWeight: 500,
                  display: "inline-block",
                  width: "100%",
                }}
              >
                Ingredient
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  margin: 0,
                  fontFamily: "EB Garamond",
                  fontSize: 18,
                  lineHeight: "28px",
                }}
              >
                {recipe.Ingredients?.split("\n").map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* How To */}
          <div className="col-md-6">
            <div
              style={{
                backgroundColor: "#FFF7E6",
                padding: 24,
                borderRadius: 16,
                border: "1.5px solid var(--color-primary-orange)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <h4
                style={{
                  backgroundColor: "var(--color-primary-orange)",
                  padding: "6px 12px",
                  color: "white",
                  borderRadius: 12,
                  fontFamily: "EB Garamond",
                  fontSize: 20,
                  fontWeight: 500,
                  display: "inline-block",
                  width: "100%",
                }}
              >
                How to
              </h4>
              <p
                style={{
                  fontFamily: "EB Garamond",
                  fontSize: 18,
                  lineHeight: "28px",
                  color: "black",
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {recipe.HowTo}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
