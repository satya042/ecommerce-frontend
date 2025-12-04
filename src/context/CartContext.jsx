import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "ecom_cart";

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + (item.priceNumber || 0) * item.quantity,
      0
    );
    const tax = subtotal * 0.05;
    const shipping = subtotal > 0 ? 5 : 0;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totals,
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};


