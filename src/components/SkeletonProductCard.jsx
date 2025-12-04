import React from "react";

const SkeletonProductCard = () => {
  return (
    <div
      style={{
        width: 300,
        borderRadius: 8,
        backgroundColor: "#f3f4f6",
        padding: "0.75rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 180,
          borderRadius: 8,
          background:
            "linear-gradient(90deg,#f3f4f6 0px,#e5e7eb 50%,#f3f4f6 100%)",
          backgroundSize: "200% 100%",
          animation: "skeleton-shimmer 1.2s ease-in-out infinite",
        }}
      />
      <div
        style={{
          marginTop: "0.75rem",
          height: 16,
          width: "60%",
          borderRadius: 9999,
          backgroundColor: "#e5e7eb",
        }}
      />
      <div
        style={{
          marginTop: "0.5rem",
          height: 14,
          width: "40%",
          borderRadius: 9999,
          backgroundColor: "#e5e7eb",
        }}
      />
    </div>
  );
};

export default SkeletonProductCard;


