import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "ecom_reviews";

const ReviewsContext = createContext(null);

const loadReviews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveReviews = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(loadReviews());
  }, []);

  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);

  const addReview = ({ productId, rating, comment, user }) => {
    const newReview = {
      id: Date.now().toString(),
      productId,
      rating,
      comment,
      userEmail: user?.email || "guest",
      userName: user?.name || "Guest",
      verified: !!user, // mock: treat logged-in users as verified
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getReviewsForProduct = (productId) =>
    reviews.filter((r) => r.productId === productId);

  const getReviewsForUser = (email) =>
    reviews.filter((r) => r.userEmail === email);

  const value = {
    reviews,
    addReview,
    getReviewsForProduct,
    getReviewsForUser,
  };

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) {
    throw new Error("useReviews must be used within ReviewsProvider");
  }
  return ctx;
};


