import React, { useState, useEffect } from "react";
import styles from "./styles/ProductForm.module.css";
import { FiX } from "react-icons/fi";

const ProductForm = ({ onSubmit, onClose, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    salePrice: "",
    stock: "",
    description: "",
    specifications: [],
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [specInput, setSpecInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        brand: initialData.brand || "",
        category: initialData.category || "",
        price: initialData.price || "",
        salePrice: initialData.salePrice || "",
        stock: initialData.stock || "",
        description: initialData.description || "",
        specifications: initialData.specifications || [],
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Product name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.stock || formData.stock < 0) newErrors.stock = "Stock must be 0 or greater";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddSpecification = () => {
    if (specInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: [...prev.specifications, specInput.trim()],
      }));
      setSpecInput("");
    }
  };

  const handleRemoveSpecification = (index) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real scenario, you'd upload this to a server or convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{initialData ? "Edit Product" : "Add New Product"}</h2>
          <button className={styles.closeBtn} onClick={onClose} type="button">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Product Name *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product name"
              className={errors.title ? styles.inputError : ""}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? styles.inputError : ""}
              >
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home & Garden</option>
                <option value="Beauty">Beauty & Personal Care</option>
              </select>
              {errors.category && <span className={styles.error}>{errors.category}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price (£) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={errors.price ? styles.inputError : ""}
              />
              {errors.price && <span className={styles.error}>{errors.price}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="salePrice">Sale Price (£)</label>
              <input
                type="number"
                id="salePrice"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stock">Stock Quantity *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={errors.stock ? styles.inputError : ""}
            />
            {errors.stock && <span className={styles.error}>{errors.stock}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className={errors.description ? styles.inputError : ""}
            />
            {errors.description && <span className={styles.error}>{errors.description}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Product Image</label>
            <div className={styles.imageUpload}>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.image && (
                <div className={styles.imagePreview}>
                  <img src={formData.image} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Specifications</label>
            <div className={styles.specInput}>
              <input
                type="text"
                value={specInput}
                onChange={(e) => setSpecInput(e.target.value)}
                placeholder="Add specification (e.g., 250g pack)"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSpecification())}
              />
              <button
                type="button"
                onClick={handleAddSpecification}
                className={styles.addBtn}
              >
                Add
              </button>
            </div>
            {formData.specifications.length > 0 && (
              <div className={styles.specList}>
                {formData.specifications.map((spec, index) => (
                  <div key={index} className={styles.specItem}>
                    <span>{spec}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(index)}
                      className={styles.removeSpecBtn}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : initialData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
