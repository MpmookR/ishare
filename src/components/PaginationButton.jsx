import React from "react";

export default function PaginationButton({
  onClick,
  disabled = false,
  icon,
  text,
  reverse = false,
}) {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: 180,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: reverse ? "row-reverse" : "row", 
      gap: 24,
      padding: "10px 24px",
      borderRadius: 21,
      outline: "1px solid black",
      outlineOffset: "-1px",
      backgroundColor: "transparent",
      border: "none",
      fontSize: 18,
      fontFamily: "var(--font-body)",
      color: "black",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      }}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
