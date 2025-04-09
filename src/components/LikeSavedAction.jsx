import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState } from "react";

export default function LikeSavedActions({
    initialLiked = false,
    initialSaved = false,
    onLikeToggle,
    onSaveToggle,
    iconColor = "var(--color-bg)",
    iconSize = 18, 
  }) {
    const [liked, setLiked] = useState(initialLiked);
    const [saved, setSaved] = useState(initialSaved);
  
    const handleLike = () => {
      setLiked(!liked);
      if (onLikeToggle) onLikeToggle(!liked);
    };
  
    const handleSave = () => {
      setSaved(!saved);
      if (onSaveToggle) onSaveToggle(!saved);
    };
  
    return (
      <div className="d-flex gap-4">
        <div onClick={handleLike} style={{ cursor: "pointer" }}>
          {liked ? (
            <FaHeart color="red" size={iconSize} />
          ) : (
            <FaRegHeart color={iconColor} size={iconSize} />
          )}
        </div>
        <div onClick={handleSave} style={{ cursor: "pointer" }}>
          {saved ? (
            <FaBookmark color="gold" size={iconSize} />
          ) : (
            <FaRegBookmark color={iconColor} size={iconSize} />
          )}
        </div>
      </div>
    );
  }
  