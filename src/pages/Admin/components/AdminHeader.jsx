import React, { useState } from 'react';
import styles from '../styles/AdminHeader.module.css';
import { FiSearch, FiChevronDown, FiBell, FiUser } from 'react-icons/fi';

const AdminHeader = ({ title = 'Overview' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Feb');
  const [categoryFilter, setCategoryFilter] = useState('Sales');

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        {/* Left Section - Title */}
        {/* <div className={styles.left_section}>
          <h1 className={styles.page_title}>{title}</h1>
        </div> */}

        {/* Center Section - Search and Filters */}
        <div className={styles.center_section}>
          <div className={styles.search_box}>
            <FiSearch size={18} className={styles.search_icon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.search_input}
            />
            {/* <FiSearch size={18} className={styles.search_icon} /> */}
          </div>

          <div className={styles.filter_group}>
            <div className={styles.filter_item}>
              <label htmlFor="date-filter">Date:</label>
              <select
                id="date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={styles.filter_select}
              >
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
              </select>
            </div>

            <div className={styles.filter_item}>
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filter_select}
              >
                <option value="Sales">Sales</option>
                <option value="Revenue">Revenue</option>
                <option value="Products">Products</option>
                <option value="Orders">Orders</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Section - User Info */}
        <div className={styles.right_section}>
          <button className={styles.notification_btn} title="Notifications">
            <FiBell size={20} />
          </button>

          <div className={styles.user_info}>
            <div className={styles.avatar}>
              <img src="https://via.placeholder.com/32" alt="User Avatar" />
            </div>
            <div className={styles.user_details}>
              <p className={styles.user_name}>Kamisato Aya</p>
              <p className={styles.user_role}>Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
