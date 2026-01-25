import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles/Products.module.css";
import { productsData } from "../../configs/ecommerce";
import Slider from "@mui/material/Slider";
import { HiOutlineChevronRight } from "react-icons/hi";
import ProductCard from "../../components/ProductCard";
import { debounce } from "../../utils/debounce";
import SkeletonProductCard from "../../components/SkeletonProductCard";

const SEARCH_STORAGE_KEY = "ecom_search_history";

const loadHistory = () => {
  try {
    const raw = localStorage.getItem(SEARCH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveHistory = (items) => {
  try {
    localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(items.slice(0, 5)));
  } catch {
    // ignore
  }
};

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 40]);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const [history, setHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHistory(loadHistory());
    const id = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(id);
  }, []);

  const debouncedSetActiveQuery = useMemo(
    () =>
      debounce((value) => {
        setActiveQuery(value.trim().toLowerCase());
        if (value.trim()) {
          setHistory((prev) => {
            const next = [value.trim(), ...prev.filter((h) => h !== value.trim())];
            saveHistory(next);
            return next;
          });
        }
      }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSetActiveQuery(value);
    setShowSuggestions(true);
  };

  const categories = useMemo(() => {
    const unique = new Set(productsData.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, []);

  const suggestions = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return productsData
      .filter((p) => p.title.toLowerCase().includes(lower))
      .slice(0, 5);
  }, [query]);

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter(
      (p) => p.priceNumber >= priceRange[0] && p.priceNumber <= priceRange[1]
    );

    if (sort === "price-asc") {
      result.sort((a, b) => a.priceNumber - b.priceNumber);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.priceNumber - a.priceNumber);
    } else if (sort === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [category, activeQuery, priceRange, sort]);

  return (
    <div className={styles.products_container}>
      <div className={styles.product_left}>
        <div className={styles.search_bar}>
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
          />
          <button type="button">
            <HiOutlineChevronRight />
          </button>
        </div>
        {showSuggestions && query.length > 0 && (suggestions.length > 0 || history.length > 0) && (
          <div className={styles.search_suggestions}>
            {suggestions.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setQuery(p.title);
                  debouncedSetActiveQuery(p.title);
                  setShowSuggestions(false);
                }}
              >
                {p.title}
              </button>
            ))}
            {suggestions.length === 0 && history.length > 0 && (
              <div className={styles.search_history}>
                <div className={styles.search_history_label}>Recent searches</div>
                {history.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      debouncedSetActiveQuery(term);
                      setShowSuggestions(false);
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.price_filter}>
          <div className={styles.filter_title}>Filter by price</div>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={40}
          />
          <div className={styles.price_inputs}>
            <div className={styles.price_input_group}>
              <div className={styles.price_input_wrapper}>
                <span>£</span>
                <input type="number" value={priceRange[0]} readOnly />
              </div>
              <div className={styles.price_input_label}>Min. Price</div>
            </div>
            <div className={styles.price_input_group}>
              <div className={styles.price_input_wrapper}>
                <span>£</span>
                <input type="number" value={priceRange[1]} readOnly />
              </div>
              <div className={styles.price_input_label}>Max. Price</div>
            </div>
          </div>
        </div>

        <div className={styles.category_filter}>
          <div className={styles.filter_title}>Category</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {categories.map((cat) => (
              <label key={cat} style={{ cursor: "pointer", fontSize: "0.9rem", fontWeight: 500 }}>
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  style={{ marginRight: "0.5rem" }}
                />
                {cat === "all" ? "All" : cat}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.sort_filter}>
          <div className={styles.filter_title}>Sort by</div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className={styles.products_right}>
        <div>
          <div className={styles.products__titl}>Everything</div>
          <div className={styles.products_grid}>
            <div className={styles.products_item}>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonProductCard key={i} />
                ))
              ) : filteredProducts.length === 0 ? (
                <div style={{ textAlign: "center", width: "100%", padding: "3rem 1rem" }}>
                  <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
                    No products match your filters.
                  </p>
                  <p style={{ fontSize: "0.9rem" }}>
                    Try adjusting your search or price range.
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;