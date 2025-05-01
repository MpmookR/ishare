import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSection({
  user,
  profileImage,
  isAdmin = false,
}) {
  const navigate = useNavigate();

  const imageSrc = profileImage || "/img/profile/profileDefault.jpg";

  // Safely fallback to relationship arrays if totals are missing
  const sharedCount = user?.TotalRecipes ?? user?.Recipes?.length ?? 0;
  const savedCount = user?.SavedRecipes?.length ?? 0;
  const totalLikes = user?.totalLikes ?? 0;

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
            {user?.FullName || "Username"}
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
              Total like:{" "}
              <span style={{ fontWeight: "bold" }}>{totalLikes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Admin Button only */}
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
