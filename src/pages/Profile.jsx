import React from "react";
import { Link } from "react-router-dom";
import { Tabs, Form, Input, Button } from "antd";
import { useAuth } from "../context/AuthContext";
import { useReviews } from "../context/ReviewsContext";
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
          className={styles.form_wrapper}
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
            className={styles.primary_btn}
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
          <p className={styles.section_instruction}>
            Manage your shipping addresses used during checkout.
          </p>
          <Button
            type="dashed"
            className={styles.dashed_btn}
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
          <p className={styles.section_instruction}>
            Your submitted reviews appear here.
          </p>
          {userReviews.length === 0 ? (
            <p className={styles.no_reviews}>
              You have not reviewed any products yet.
            </p>
          ) : (
            <div className={styles.reviews_list}>
              {userReviews.map((rev) => (
                <div
                  key={rev.id}
                  className={styles.review_item}
                >
                  <div className={styles.review_header}>
                    <span className={styles.review_product_id}>
                      {rev.productId}
                    </span>
                    <span className={styles.review_stars}>
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </span>
                  </div>
                  <p className={styles.review_text}>{rev.comment}</p>
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
    <div className={styles.page_wrapper}>
      <div className={styles.header_row}>
        <div>
          <h1 className={styles.header_title}>
            My account
          </h1>
          <p className={styles.header_subtitle}>
            {user ? `Signed in as ${user.email}` : "Guest"}
          </p>
        </div>
        {user && (
          <button
            type="button"
            onClick={logout}
            className={styles.header_logout_btn}
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


