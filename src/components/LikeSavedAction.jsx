import { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { saveRecipe, deleteSavedRecipe } from "../services/savedService"; 
import { likeRecipe, unlikeRecipe } from "../services/likeService";
import { AppContext } from "../context/AppContext";

export default function LikeSavedActions({
  recipeId,
  savedRecipeId = null,
  likedByCurrentUser = false,
  defaultSaved = false,
  iconColor = "black",
  iconSize = 24,
  onSaveToggle = () => {},
  onLikeToggle = () => {},
}) {
  const { user, token } = useContext(AppContext); 
  const liked = likedByCurrentUser;
  const saved = defaultSaved;


  const handleSaveClick = async () => {
    if (!token) return alert("Login required to save recipes.");
    try {
      if (saved) {
        await deleteSavedRecipe(savedRecipeId, token);
      } else {
        await saveRecipe(recipeId, token);

      }
      onSaveToggle?.(); 
    } catch (err) {
      console.error("Save toggle failed:", err);
    }
  };

  const handleLikeClick = async () => {
    if (!token || !user?.Id) return alert("Login required to like recipes.");
    try {
      if (liked) {
        await unlikeRecipe(recipeId, user.Id, token); 

      } else {
        await likeRecipe(recipeId, token); 

      }
      onLikeToggle?.();
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
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
