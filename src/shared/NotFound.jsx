import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>404</h1>
      <p style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
        We couldn't find that page.
      </p>
      <p style={{ marginBottom: "1rem", color: "#6b7280", fontSize: "0.9rem" }}>
        It might have been moved or the URL may be incorrect.
      </p>
      <Link
        to="/"
        style={{
          padding: "0.5rem 1.5rem",
          borderRadius: "9999px",
          backgroundColor: "#679830",
          color: "#fff",
        }}
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;


