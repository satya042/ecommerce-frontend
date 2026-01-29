import React, { useState, useEffect } from "react";
import styles from "../styles/ManageProducts.module.css";
import ProductForm from "./ProductForm";
import { api } from "../../../services/apiConfig";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

const ManageProducts = ({ isCollapsed = false }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dummy data for testing (will be replaced with API calls)
  const dummyProducts = [
    {
      id: "1",
      title: "Assorted Coffee",
      brand: "Organic Farm",
      category: "Groceries",
      price: "£35.00",
      salePrice: "",
      stock: 20,
      description: "Rich and aromatic coffee beans",
      specifications: [],
      image: "",
    },
    {
      id: "2",
      title: "Cashew Butter",
      brand: "Nature Spread",
      category: "Groceries",
      price: "£25.00",
      salePrice: "",
      stock: 15,
      description: "Creamy cashew butter with no added sugar",
      specifications: [],
      image: "",
    },
    {
      id: "3",
      title: "Organic Honey",
      brand: "Pure Gold",
      category: "Groceries",
      price: "£15.00",
      salePrice: "",
      stock: 30,
      description: "Pure organic honey from local farms",
      specifications: [],
      image: "",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, filterCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      // Uncomment when backend is ready:
      // const data = await api.getAllProducts();
      // setProducts(data);
      
      // Using dummy data for now
      setProducts(dummyProducts);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== "All") {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleAddProduct = async (formData) => {
    setLoading(true);
    setError("");
    try {
      // Uncomment when backend is ready:
      // await api.createProduct(formData);
      
      // For now, add to local state
      const newProduct = {
        id: String(Date.now()),
        ...formData,
      };
      setProducts([...products, newProduct]);
      setSuccess("Product added successfully!");
      setShowForm(false);
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (formData) => {
    setLoading(true);
    setError("");
    try {
      // Uncomment when backend is ready:
      // await api.updateProduct(editingProduct.id, formData);
      
      // For now, update local state
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      );
      setSuccess("Product updated successfully!");
      setShowForm(false);
      setEditingProduct(null);
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update product. Please try again.");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      setError("");
      try {
        // Uncomment when backend is ready:
        // await api.deleteProduct(id);
        
        // For now, remove from local state
        setProducts(products.filter((p) => p.id !== id));
        setSuccess("Product deleted successfully!");
        
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete product. Please try again.");
        console.error("Error deleting product:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const categories = ["All", "Groceries", "Electronics", "Fashion", "Home", "Beauty"];

  return (
    <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <h1>Manage Products</h1>
      </div>

      {error && <div className={styles.alert + " " + styles.error}>{error}</div>}
      {success && <div className={styles.alert + " " + styles.success}>{success}</div>}

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch size={20} />
          <input
            type="text"
            placeholder="Search by product name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <label>Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && !showForm ? (
        <div className={styles.loading}>Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.empty}>
          <p>No products found. {searchTerm || filterCategory !== "All" ? "Try adjusting your filters." : "Add a new product to get started."}</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productName}>{product.title}</div>
                  </td>
                  <td>{product.brand || "-"}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <span
                      className={
                        product.stock <= 10
                          ? styles.stockLow
                          : styles.stockOk
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(product)}
                        disabled={loading}
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={loading}
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onClose={handleCloseForm}
          initialData={editingProduct}
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default ManageProducts;
