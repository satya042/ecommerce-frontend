import styles from "./styles/SkeletonProductCard.module.css";

const SkeletonProductCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image_skeleton} />
      <div className={styles.text_skeleton_long} />
      <div className={styles.text_skeleton_short} />
    </div>
  );
};

export default SkeletonProductCard;


