import React from "react";
import { Link } from "react-router-dom";
import { Tabs, Form, Input, Button } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useReviews } from "../../context/ReviewsContext";
import styles from "./styles/Profile.module.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const { getReviewsForUser } = useReviews();
  const userReviews = user ? getReviewsForUser(user.email) : [];

  const items = [
    {
      key: "profile",
      label: "Profile info",
      children: (
        <Form
          layout="vertical"
          style={{ maxWidth: 480 }}
          initialValues={{
            name: user?.name,
            email: user?.email,
            phone: "",
          }}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Button
            type="primary"
            style={{
              backgroundColor: "#679830",
              borderColor: "#679830",
            }}
          >
            Save changes
          </Button>
        </Form>
      ),
    },
    {
      key: "addresses",
      label: "Addresses",
      children: (
        <div>
          <p style={{ marginBottom: "0.5rem" }}>
            Manage your shipping addresses used during checkout.
          </p>
          <Button
            type="dashed"
            style={{
              borderColor: "#679830",
              color: "#679830",
            }}
          >
            Add new address
          </Button>
        </div>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      children: (
        <div>
          <p style={{ marginBottom: "0.5rem" }}>
            Your submitted reviews appear here.
          </p>
          {userReviews.length === 0 ? (
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              You have not reviewed any products yet.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              {userReviews.map((rev) => (
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
                      {rev.productId}
                    </span>
                    <span style={{ fontSize: "0.8rem" }}>
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem" }}>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  const userProfile = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
  };

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: 900, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>
            My account
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            {user ? `Signed in as ${user.email}` : "Guest"}
          </p>
        </div>
        {user && (
          <button
            type="button"
            onClick={logout}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "9999px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              fontSize: "0.85rem",
            }}
          >
            Logout
          </button>
        )}
      </div>

      <div className={styles.profile_container}>
        <h1 className={styles.profile_title}>My Profile</h1>
        <div className={styles.profile_content}>
          <div className={styles.profile_section}>
            <h2 className={styles.section_title}>Personal Information</h2>
            <div className={styles.profile_info}>
              <div className={styles.info_row}>
                <span className={styles.info_label}>Name:</span>
                <span className={styles.info_value}>{userProfile.name}</span>
              </div>
              <div className={styles.info_row}>
                <span className={styles.info_label}>Email:</span>
                <span className={styles.info_value}>{userProfile.email}</span>
              </div>
              <div className={styles.info_row}>
                <span className={styles.info_label}>Phone:</span>
                <span className={styles.info_value}>{userProfile.phone}</span>
              </div>
              <div className={styles.info_row}>
                <span className={styles.info_label}>Address:</span>
                <span className={styles.info_value}>{userProfile.address}</span>
              </div>
            </div>
            <button className={styles.edit_button}>Edit Profile</button>
            <button className={styles.logout_button}>Logout</button>
          </div>

          <div className={styles.profile_section}>
            <h2 className={styles.section_title}>Quick Links</h2>
            <div className={styles.quick_links}>
              <Link to="/orders" className={styles.quick_link}>
                View Orders
              </Link>
              <Link to="/wishlist" className={styles.quick_link}>
                My Wishlist
              </Link>
              <Link to="/cart" className={styles.quick_link}>
                Shopping Cart
              </Link>
              <Link to="/settings" className={styles.quick_link}>
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="profile" items={items} />
    </div>
  );
};

export default Profile;


