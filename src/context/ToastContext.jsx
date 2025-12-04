import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info") => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), 3000);
  }, [remove]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          right: "1.25rem",
          top: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          zIndex: 60,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "0.5rem 0.75rem",
              minWidth: "200px",
              borderRadius: "0.5rem",
              backgroundColor:
                t.type === "success"
                  ? "#16a34a"
                  : t.type === "error"
                  ? "#dc2626"
                  : "#111827",
              color: "#f9fafb",
              fontSize: "0.875rem",
              boxShadow: "0 10px 15px rgba(0,0,0,0.25)",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
};


