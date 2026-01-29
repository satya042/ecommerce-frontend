import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import styles from "./styles/Wishlist.module.css";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const moveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    showToast("Moved to cart", "success");
  };

  if (!items.length) {
    return (
      <div className={styles.empty_container}>
        <h2 className={styles.empty_title}>
          Your wishlist is empty
        </h2>
        <p className={styles.empty_text}>
          Save items you love and move them to cart anytime.
        </p>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className={styles.empty_btn}
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wishlist_container}>
      <h1 className={styles.wishlist_title}>My Wishlist</h1>
      <div className={styles.wishlist_grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.wishlist_item}>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className={styles.wishlist_item_image}
            />
            <div className={styles.wishlist_item_name}>{item.title}</div>
            <div className={styles.wishlist_item_price}>
              {item.salePrice || item.price}
            </div>
            <div className={styles.item_actions}>
              <button
                type="button"
                onClick={() => moveToCart(item)}
                className={styles.add_to_cart_button}
              >
                Move to cart
              </button>
              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                className={styles.remove_button}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;


