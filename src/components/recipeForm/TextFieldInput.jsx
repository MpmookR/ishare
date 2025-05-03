import React from "react";

export default function TextFieldInput({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = false,
  errorMessage = "",
}) {
  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        gap: 8,
        display: "inline-flex",
      }}
    >
      <label
        style={{
          paddingLeft: 8,
          fontSize: "var(--font-size-body)",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
        }}
      >
        {label}
      </label>

      <div
        style={{
          alignSelf: "stretch",
          padding: 16,
          background: "var(--color-white)",
          borderRadius: 21,
          border: error ? "2px solid red" : "none",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            background: "transparent",
            fontSize: 18,
            fontFamily: "var(--font-body)",
          }}
        />
      </div>
      {error && (
        <div
          style={{ color: "red", marginTop: 6, marginLeft: 8, fontSize: 14 }}
        >
          {errorMessage || "This field is required."}
        </div>
      )}
    </div>
  );
}
