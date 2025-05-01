import { useNavigate } from "react-router-dom";
import LikeSavedActions from "./LikeSavedAction";

export default function RecipeCard({ recipe, showDelete = false, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        padding: 24,
        borderRadius: 21,
        outline: "1px solid black",
        outlineOffset: "-1px",
        display: "flex",
        flexWrap: "wrap",
        gap: 56,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {/* Recipe Image */}
      <img
        src={recipe.Image || "https://placehold.co/407x326"}
        alt={recipe.Name}
        style={{
          width: 300,
          height: 250,
          objectFit: "cover",
          borderRadius: 21,
          border: "1.5px solid black",
        }}
      />

      {/* Right Section */}
      <div
        style={{
          flex: "1 1 600px",
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Header: Title + Stars + Icons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3
            style={{
              fontSize: 32,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              lineHeight: "38.4px",
              margin: 0,
            }}
          >
            {recipe.Name}
          </h3>

          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <LikeSavedActions
              iconColor="var(--color-black)"
              iconSize={24} // or 36 or whatever you like
              onLikeToggle={(liked) => {
                console.log("Liked?", liked);
              }}
              onSaveToggle={(saved) => {
                console.log("Saved?", saved);
              }}
            />
          </div>
        </div>

        {/* Category + User */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--color-primary-blue)",
              borderRadius: 21,
              color: "var(--color-bg)",
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: "21px",
            }}
          >
            {recipe.Category || "Breakfast"}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                color: "var(--color-black)",
                fontSize: 18,
                fontFamily: "var(--font-body)",
                fontWeight: 400,
              }}
            >
              Post by @ <strong>{recipe.UserName || "anonymous user"}</strong>
            </div>
          </div>
        </div>

        {/* Intro Text */}
        <p
          style={{
            fontSize: 20,
            fontFamily: "var(--font-body)",
            lineHeight: "24px",
            margin: 0,
          }}
        >
          {recipe.Intro ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."}
        </p>

        {/* View Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => navigate(`/recipe/${recipe.RecipeId}`)}
            style={{
              padding: 10,
              backgroundColor: "var(--color-primary-orange)",
              color: "var(--color-bg)",
              border: "none",
              borderRadius: 21,
              width: 180,
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "var(--font-body)",
              cursor: "pointer",
            }}
          >
            View
          </button>

          {showDelete && (
            <button
            onClick={() => onDelete(recipe.RecipeId)}
            style={{
                marginLeft: 16,
                padding: 10,
                backgroundColor: "transparent",
                color: "black",
                border: "1.5px solid red",
                borderRadius: 21,
                width: 120,
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
