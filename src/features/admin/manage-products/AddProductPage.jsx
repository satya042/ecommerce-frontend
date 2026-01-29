import React, { useState } from 'react';
import styles from '../styles/AddProductPage.module.css';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const AddProductPage = ({ isCollapsed = false }) => {
  const [formData, setFormData] = useState({
    name: 'Puffer Jacket With Pocket Detail',
    brand: 'Premium Wear',
    description: 'Premium quality puffer jacket with multiple pockets and modern design',
    basePricing: '299',
    stock: '45',
    discount: '15',
    discountType: 'percentage',
    category: 'Jacket',
  });

  const [uploadedImages, setUploadedImages] = useState([
    'https://via.placeholder.com/300x400?text=Puffer+Jacket',
  ]);

  const [previewImage, setPreviewImage] = useState(uploadedImages[0]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages((prev) => [...prev, event.target.result]);
        if (uploadedImages.length === 0) {
          setPreviewImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    if (newImages.length > 0 && previewImage === uploadedImages[index]) {
      setPreviewImage(newImages[0]);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData);
  };

  const handleAddProduct = () => {
    console.log('Adding product...', formData);
  };

  return (
    <div className={`${styles.page_container} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Header Section */}
      <div className={styles.page_header}>
        <h1 className={styles.page_title}>Add New Product</h1>
        <div className={styles.action_buttons}>
          <button
            className={styles.btn_secondary}
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>
          <button
            className={styles.addBtn}
            onClick={handleAddProduct}
          >
            <FiPlus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.content_grid}>
        {/* Left Column - Product Form */}
        <div className={styles.left_column}>
          {/* General Information Card */}
          <div className={styles.card}>
            <h2 className={styles.card_title}>General Information</h2>

            <div className={styles.grid_2col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className={styles.input}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Description Product</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={5}
                className={styles.textarea}
              />
            </div>
          </div>

          {/* Pricing and Stock Card */}
          <div className={styles.card}>
            <h2 className={styles.card_title}>Pricing And Stock</h2>

            <div className={styles.grid_2col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Base Pricing</label>
                <div className={styles.input_with_prefix}>
                  <span className={styles.prefix}>$</span>
                  <input
                    type="number"
                    name="basePricing"
                    value={formData.basePricing}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.grid_2col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={styles.input}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Discount Type</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image Upload & Category */}
        <div className={styles.right_column}>
          {/* Upload Image Card */}
          <div className={styles.card}>
            <h2 className={styles.card_title}>Upload Img</h2>

            <div className={styles.image_preview_container}>
              <img
                src={previewImage}
                alt="Product Preview"
                className={styles.image_preview}
              />
            </div>

            <div className={styles.thumbnails}>
              {uploadedImages.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    previewImage === image ? styles.active : ''
                  }`}
                  onClick={() => setPreviewImage(image)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                  <button
                    className={styles.thumbnail_remove}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}

              <label className={styles.thumbnail_add}>
                <FiPlus size={24} />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </div>
          </div>

          {/* Category Card */}
          <div className={styles.card}>
            <h2 className={styles.card_title}>Category</h2>

            <div className={styles.form_group}>
              <label className={styles.label}>Product Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="Jacket">Jacket</option>
                <option value="Shirt">Shirt</option>
                <option value="Pants">Pants</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <button className={styles.btn_add_category}>
              <FiPlus size={18} />
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
