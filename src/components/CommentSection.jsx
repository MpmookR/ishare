import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { addComment, deleteComment } from "../services/commentService";
import { FaTrashAlt } from "react-icons/fa";

export default function CommentSection({ recipeId, initialComments }) {
  const { user, token } = useContext(AppContext);
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");


  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await addComment({ content: newComment, recipeId }, token);

      console.log("POST response:", response);

      const comment = response;
  
      const normalizedComment = {
        CommentId: comment.CommentId,
        Content: comment.Content,
        CreatedAt: comment.CreatedAt,
        UserId: comment.UserId,
        UserName: comment.UserName || "username",
        UserProfileImage: comment.UserProfileImage || "/img/profile/profileDefault.jpg",
        RecipeId: comment.RecipeId,
      };
  
      setComments((prev) => [...prev, normalizedComment]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment");
      console.error(err);
    }
  };
  

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment(commentId, token);
      setComments((prev) => prev.filter((c) => c.CommentId !== commentId));
    } catch (err) {
      alert("Failed to delete");
      console.error(err);
    }
  };

  return (
    <section style={{ marginTop: "2rem" }}>
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
        Comment
      </h4>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {comments.map((c) => (
          <div
            key={c.CommentId}
            className="d-flex flex-column gap-2 p-3"
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              border: "1px solid #ddd",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={c.UserProfileImage || "/img/profile/profileDefault.jpg"}
                  alt="User avatar"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "9999px",
                    outline: "1px solid var(--color-primary-orange)",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontFamily: "EB Garamond",
                    lineHeight: "24px",
                  }}
                >
                {user?.FullName || "username"}
                </div>
              </div>

              {/* Delete icon visible only to comment creator */}
              {user?.Id === c.UserId && (
                <FaTrashAlt
                  size={18}
                  title="Delete"
                  onClick={() => handleDelete(c.CommentId)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              )}
            </div>

            <div
              style={{
                paddingLeft: 12,
                paddingRight: 12,
                fontSize: 18,
                fontFamily: "EB Garamond",
                lineHeight: "26px",
              }}
            >
              {c.Content}
            </div>
          </div>
        ))}

        {/* Comment input */}
        {user ? (
          <>
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write comment here…"
              style={{
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "17px",
                fontFamily: "EB Garamond",
                lineHeight: "28px",
                resize: "vertical",
                color: "black",
              }}
              
            />
            <button
              onClick={handleSubmit}
              style={{
                alignSelf: "flex-end",
                padding: "10px 20px",
                backgroundColor: "var(--color-primary-orange)",
                border: "none",
                borderRadius: "21px",
                color: "#fff",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Comment
            </button>
          </>
        ) : (
          <p>Please log in to comment.</p>
        )}
      </div>
    </section>
  );
}
