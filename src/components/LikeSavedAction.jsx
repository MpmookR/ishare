import { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { saveRecipe, deleteSavedRecipe } from "../services/savedService"; 
import { AppContext } from "../context/AppContext";

export default function LikeSavedActions({
  recipeId,
  savedRecipeId = null,
  defaultLiked = false,
  defaultSaved = false,
  iconColor = "black",
  iconSize = 24,
  onSaveToggle = () => {},
  onLikeToggle = () => {},
}) {
  const { token } = useContext(AppContext); 
  const [liked, setLiked] = useState(defaultLiked); // need to work on it later
  const [saved, setSaved] = useState(defaultSaved);

  const handleSaveClick = async () => {
    if (!token) return alert("Login required to save recipes.");

    try {
      if (saved) {
        // Unsave
        await deleteSavedRecipe(savedRecipeId, token);
        setSaved(false);
        onSaveToggle();
      } else {
        // Save
        await saveRecipe(recipeId, token);
        setSaved(true);
        onSaveToggle();
      }
    } catch (err) {
      console.error("Save toggle failed:", err);
    }
  };

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    onLikeToggle(newLiked);
  };

  return (
    <div className="d-flex gap-3 align-items-center">
      {/* Like Icon */}
      <span onClick={handleLikeClick} style={{ cursor: "pointer" }}>
        {liked ? (
          <FaHeart size={iconSize} color="red" />
        ) : (
          <FaRegHeart size={iconSize} color={iconColor} />
        )}
      </span>

      {/* Save Icon */}
      <span onClick={handleSaveClick} style={{ cursor: "pointer" }}>
        {saved ? (
          <FaBookmark size={iconSize} color="gold" />
        ) : (
          <FaRegBookmark size={iconSize} color={iconColor} />
        )}
      </span>
    </div>
  );
}
