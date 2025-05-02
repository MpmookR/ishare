import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext"; // Ensure correct path

export default function ProfileSection({ profileImage, isAdmin = false }) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext); // Get user from global context

  // Fallback to default image if none provided
  const imageSrc = profileImage || "/img/profile/profileDefault.jpg";

  // Fallback display name
  const fullName = user?.FullName || "Username";

  // Fetch stats from user object in context (must match your backend DTO fields)
  const sharedCount = user?.TotalRecipes ?? 0;
  const savedCount = user?.TotalSavedRecipes ?? 0; 
  const totalLikes = user?.TotalLikes ?? 0;

  return (
    <div
      style={{
        width: "100%",
        padding: 32,
        background: "var(--color-primary-green)",
        borderRadius: 21,
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      {/* Left side */}
      <div
        style={{
          flex: "1 1 0",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 86,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <img
          src={imageSrc}
          alt="Profile"
          style={{
            width: 130,
            height: 130,
            borderRadius: 9999,
            outline: "3px var(--color-primary-orange) solid",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "var(--color-bg)",
              fontSize: "var(--font-size-h3)",
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            {fullName}
          </div>

          <div
            style={{
              display: "flex",
              gap: 26,
              fontSize: 24,
              color: "var(--color-bg)",
              fontFamily: "var(--font-body)",
            }}
          >
            <div>
              Shared: <span style={{ fontWeight: "bold" }}>{sharedCount}</span>
            </div>
            <div>
              Saved: <span style={{ fontWeight: "bold" }}>{savedCount}</span>
            </div>
            <div>
              Total like: <span style={{ fontWeight: "bold" }}>{totalLikes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Admin Panel button */}
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => navigate("/admin/dashboard")}
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
            Admin Panel
          </button>
        </div>
      )}
    </div>
  );
}
