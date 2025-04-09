import { useState } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { saveRecipe } from "../services/saveRecipeService";
import LikeSavedActions from "./LikeSavedAction";

// Props: recipe (object), variant (either 'blue' or 'green')
export default function HighlightCard({
  recipe,
  variant = "blue",
  defaultSaved = false,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(defaultSaved);

  const handleSave = async () => {
    if (!saved) {
      try {
        await saveRecipe(recipe.RecipeId, token);
        setSaved(true);
      } catch (error) {
        console.error("Failed to save recipe:", error);
      }
    } else {
      setSaved(false); // optional: toggle off
    }
  };

  // Define background color based on variant
  const bgColor =
    variant === "blue"
      ? "var(--color-primary-blue)"
      : "var(--color-primary-green)";

  return (
    <div
      className="highlight-card flex-shrink-0"
      style={{
        width: "100%",
        maxWidth: 380,
        minWidth: 280,
        height: 420,
        background: bgColor,
        borderRadius: 21,
        overflow: "hidden",
        position: "relative",
        flex: "1 1 300px",
      }}
    >
      {/* Inner layout wrapper */}
      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Image Section */}
        <img
          src={recipe.Image || "https://placehold.co/335x260"}
          alt={recipe.Name}
          style={{
            width: "100%",
            height: 180,
            borderRadius: 21,
            border: "1.5px solid black",
            objectFit: "cover",
          }}
        />

        {/* Content below the image */}
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Title & Description */}
          <div
            className="d-flex flex-column align-items-center gap-3"
            style={{ width: "100%" }}
          >
            {/* Recipe Title */}
            <h3
              style={{
                fontSize: "var(--font-size-h3)",
                fontStyle: "italic",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                lineHeight: "32px",
                textAlign: "center",
                color: "var(--color-bg)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
              title={recipe.Name}
            >
              {recipe.Name || "Untitled Recipe"}
            </h3>

            {/* Recipe Description */}
            <div
              style={{
                width: "100%",
                height: "72px",
                overflow: "hidden",
                fontSize: "var(--font-size-body)",
                lineHeight: "24px",
                fontFamily: "var(--font-body)",
                color: "var(--color-bg)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  height: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {recipe.Intro ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."}
              </p>
            </div>
          </div>

          {/* Footer row (user and icons) */}
          <div
            className="d-flex justify-content-between w-100"
            style={{ alignItems: "center" }}
          >
            <div
              className="d-flex gap-2"
              style={{
                fontSize: "var(--font-size-footer)",
                color: "var(--color-bg)",
              }}
            >
              <span>Posted by</span>
              <span>@{recipe.UserName || "username"}</span>
            </div>

            <div className="d-flex gap-4">
              <LikeSavedActions
                initialLiked={false}
                initialSaved={false}
                iconColor="var(--color-bg)"
                onSaveToggle={(newSaved) => {
                  // Optionally trigger save API
                  if (newSaved) saveRecipe(recipe.RecipeId, token);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
