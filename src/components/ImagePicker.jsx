import React from "react";

const ImagePicker = ({
  show,
  onClose,
  imageList,
  selectedImage,
  onSelect,
}) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--color-white)",
          padding: "20px",
          borderRadius: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {imageList.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`preview-${index}`}
            onClick={() => {
              onSelect(url);
              onClose();
            }}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
              border:
                selectedImage === url
                  ? "2px solid var(--color-primary-blue)"
                  : "1px solid #ccc",
              cursor: "pointer",
              transition: "0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagePicker;
