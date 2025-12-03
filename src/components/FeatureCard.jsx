import React from "react";
import styles from "./styles/styles.module.css";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.icon}>
        <img src={icon} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;