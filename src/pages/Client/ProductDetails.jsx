import React, { useMemo, useState } from "react";
import styles from "./styles/ProductDetails.module.css";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { bestSellingproducts, productsData } from "../../configs/ecommerce";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { useReviews } from "../../context/ReviewsContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { addReview, getReviewsForProduct } = useReviews();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const product =
    productsData.find((p) => p.id === id) || productsData[0] || null;

  if (!product) {
    return (
      <div className={styles.home_container}>
        <p>Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast("Added to cart", "success");
  };

  const related = bestSellingproducts.filter((p) => p.id !== product.id);
  const productReviews = getReviewsForProduct(product.id);

  const filteredReviews = useMemo(() => {
    if (ratingFilter === "all") return productReviews;
    const r = Number(ratingFilter);
    return productReviews.filter((rev) => rev.rating === r);
  }, [productReviews, ratingFilter]);

  const avgRating =
    productReviews.length === 0
      ? null
      : (
          productReviews.reduce((sum, r) => sum + r.rating, 0) /
          productReviews.length
        ).toFixed(1);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast("Please enter a review comment", "error");
      return;
    }
    addReview({
      productId: product.id,
      rating: reviewRating,
      comment: reviewComment.trim(),
      user,
    });
    setReviewComment("");
    setReviewRating(5);
    showToast("Review added", "success");
  };

  return (
    <div className={styles.home_container}>
      <div className={styles.home_section}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.home_image}
        />
        <div className={styles.home_content}>
          <h1 className={styles.home_title}>{product.title}</h1>
          <p className={styles.home_description}>{product.description}</p>
          <h2 className={styles.home_price}>
            {product.salePrice ? (
              <>
                <span style={{ textDecoration: "line-through", marginRight: 8 }}>
                  {product.price}
                </span>
                {product.salePrice}
              </>
            ) : (
              product.price
            )}
          </h2>
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Brand: <strong>{product.brand}</strong>
          </p>
          <p style={{ marginTop: "0.25rem", fontSize: "0.9rem" }}>
            Stock:{" "}
            <span
              style={{
                color: product.stock > 0 ? "#16a34a" : "#dc2626",
                fontWeight: 600,
              }}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </p>
          <button
            type="button"
            className={styles.home_button}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Specifications</h3>
            <ul style={{ paddingLeft: "1.25rem", fontSize: "0.9rem" }}>
              {product.specifications?.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Customer reviews</h3>
            {avgRating && (
              <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                Average rating: <strong>{avgRating}</strong> / 5 (
                {productReviews.length} review
                {productReviews.length !== 1 ? "s" : ""})
              </p>
            )}
            <div style={{ marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", marginRight: "0.5rem" }}>
                Filter by rating:
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                style={{ fontSize: "0.85rem" }}
              >
                <option value="all">All</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
            {filteredReviews.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                No reviews yet. Be the first to review this product.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                {filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      padding: "0.5rem 0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        {rev.userName}
                      </span>
                      <span style={{ fontSize: "0.8rem" }}>
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem" }}>{rev.comment}</p>
                    {rev.verified && (
                      <span
                        style={{
                          marginTop: "0.25rem",
                          display: "inline-block",
                          fontSize: "0.7rem",
                          padding: "0.1rem 0.35rem",
                          borderRadius: 9999,
                          backgroundColor: "#dcfce7",
                          color: "#15803d",
                        }}
                      >
                        Verified purchase
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmitReview}>
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={{ fontSize: "0.85rem", marginRight: "0.5rem" }}>
                  Your rating:
                </label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  style={{ fontSize: "0.85rem" }}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                placeholder={
                  user
                    ? "Share your experience with this product"
                    : "Sign in for a verified review, or leave a guest comment"
                }
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  padding: "0.5rem",
                  fontSize: "0.85rem",
                  resize: "vertical",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: "0.5rem",
                  padding: "0.4rem 0.9rem",
                  borderRadius: 9999,
                  border: "none",
                  backgroundColor: "#679830",
                  color: "#fff",
                  fontSize: "0.85rem",
                }}
              >
                Submit review
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.best_selling_products}>
        <h2>Related products</h2>
        <div className={styles.products}>
          {related.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;