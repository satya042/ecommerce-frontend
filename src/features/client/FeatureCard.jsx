import React from "react";
import styles from "./styles/ProductCard.module.css";

const FeatureCard = ({ icon:Icon, title, description }) => {
  return (
    <div className={styles.featureCard}>
     <div>
        {Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;