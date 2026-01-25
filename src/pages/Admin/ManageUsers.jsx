import React, { useState, useEffect } from "react";
import styles from "./styles/ManageUsers.module.css";

const ManageUsers = ({ isCollapsed = false }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // API call will go here
      // For now, just set empty users
      setUsers([]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}>
      <h1>Manage Users</h1>
      <p>Users management coming soon...</p>
    </div>
  );
};

export default ManageUsers;
