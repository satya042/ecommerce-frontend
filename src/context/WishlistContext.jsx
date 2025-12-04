import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "ecom_wishlist";

const loadWishlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadWishlist());
  }, []);

  useEffect(() => {
    saveWishlist(items);
  }, [items]);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearWishlist = () => setItems([]);

  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
};


