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
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const product =
    productsData.find((p) => p.id === id) || productsData[0] || null;

    
    const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast("Added to cart", "success");
    setQuantity(1);
  };
  
  const related = bestSellingproducts.filter((p) => p.id !== product.id);
  const productReviews = getReviewsForProduct(product.id);

  const filteredReviews = useMemo(() => {
    if (ratingFilter === "all") return productReviews;
    const r = Number(ratingFilter);
    return productReviews.filter((rev) => rev.rating === r);
  }, [productReviews, ratingFilter]);
  
  if (!product) {
    return (
      <div className={styles.container}>
        <p>Product not found.</p>
      </div>
    );
  }
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

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <div className={styles.container}>
      {/* Main Product Section */}
      <div className={styles.productSection}>
        {/* Left Column - Product Image */}
        <div className={styles.imageColumn}>
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <div className={styles.zoomIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
                <path d="M11 8v6M8 11h6"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className={styles.detailsColumn}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <a href="/">Home</a>
            <span>/</span>
            <a href="/products">{product.category || "Products"}</a>
            <span>/</span>
            <span>{product.title}</span>
          </nav>

          {/* Product Title */}
          <h1 className={styles.productTitle}>{product.title}</h1>

          {/* Price Section */}
          <div className={styles.priceSection}>
            <div className={styles.priceContainer}>
              {product.salePrice ? (
                <>
                  <span className={styles.originalPrice}>{product.price}</span>
                  <span className={styles.currentPrice}>{product.salePrice}</span>
                </>
              ) : (
                <span className={styles.currentPrice}>{product.price}</span>
              )}
            </div>
            <p className={styles.shippingInfo}>Free Shipping on orders over $50</p>
          </div>

          {/* Short Description */}
          <p className={styles.shortDescription}>{product.description}</p>

          {/* Purchase Controls */}
          <div className={styles.purchaseSection}>
            <div className={styles.quantityControl}>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className={styles.quantityInput}
              />
            </div>
            <button
              type="button"
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>

          {/* Stock Status */}
          <p className={styles.stockStatus}>
            Stock:{" "}
            <span
              className={
                product.stock > 0
                  ? styles.stockAvailable
                  : styles.stockUnavailable
              }
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </p>

          {/* Product Categories */}
          <div className={styles.categoriesSection}>
            <span className={styles.categoryLabel}>Category:</span>
            <a href="/products" className={styles.categoryLink}>
              {product.category || "Products"}
            </a>
          </div>

          {/* Trust & Payment Section */}
          <div className={styles.trustSection}>
            <div className={styles.trustIcon}>✓</div>
            <div className={styles.trustContent}>
              <p className={styles.trustText}>Guaranteed Safe Checkout</p>
              <div className={styles.paymentIcons}>
                <span className={styles.icon} title="Visa">Visa</span>
                <span className={styles.icon} title="MasterCard">MC</span>
                <span className={styles.icon} title="American Express">Amex</span>
                <span className={styles.icon} title="Discover">Discover</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabsSection}>
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === "description" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "reviews" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({productReviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "description" && (
            <div className={styles.descriptionTab}>
              <h2>Product Description</h2>
              <p>{product.description}</p>
              {product.specifications && product.specifications.length > 0 && (
                <>
                  <h3>Specifications</h3>
                  <ul className={styles.specificationsList}>
                    {product.specifications.map((spec) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={styles.reviewsTab}>
              <div className={styles.reviewsHeader}>
                {avgRating && (
                  <div className={styles.averageRatingSection}>
                    <p className={styles.averageRating}>
                      Average Rating: <strong>{avgRating}</strong> / 5
                    </p>
                    <p className={styles.reviewCount}>
                      ({productReviews.length} review{productReviews.length !== 1 ? "s" : ""})
                    </p>
                  </div>
                )}

                <div className={styles.filterSection}>
                  <label className={styles.filterLabel}>Filter by rating:</label>
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All</option>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                </div>
              </div>

              {filteredReviews.length === 0 ? (
                <p className={styles.noReviewsMessage}>
                  No reviews yet. Be the first to review this product.
                </p>
              ) : (
                <div className={styles.reviewsList}>
                  {filteredReviews.map((rev) => (
                    <div key={rev.id} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <span className={styles.reviewUsername}>
                          {rev.userName}
                        </span>
                        <span className={styles.reviewStars}>
                          {"★".repeat(rev.rating)}
                          {"☆".repeat(5 - rev.rating)}
                        </span>
                      </div>
                      <p className={styles.reviewComment}>{rev.comment}</p>
                      {rev.verified && (
                        <span className={styles.verifiedBadge}>
                          Verified purchase
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <form className={styles.reviewForm} onSubmit={handleSubmitReview}>
                <h3>Leave a Review</h3>
                <div className={styles.formGroup}>
                  <label className={styles.ratingLabel}>Your rating:</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className={styles.ratingSelect}
                  >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Good</option>
                    <option value={3}>3 - Average</option>
                    <option value={2}>2 - Poor</option>
                    <option value={1}>1 - Terrible</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="reviewComment">Your review:</label>
                  <textarea
                    id="reviewComment"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={4}
                    placeholder={
                      user
                        ? "Share your experience with this product"
                        : "Sign in for a verified review, or leave a guest comment"
                    }
                    className={styles.reviewTextarea}
                  />
                </div>
                <button type="submit" className={styles.submitReviewButton}>
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className={styles.relatedProductsSection}>
        <h2>Related Products</h2>
        <div className={styles.productsGrid}>
          {related.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;