import styles from "../Community/community.module.css";

const CommuChild = ({ icon, title, description, alt }) => {
  return (
    <div className={styles['card']}>
      <div className={styles['card-icon']}>
        <img src={icon} alt={alt} />
      </div>
      <h3 className={styles['card-title']}>{title}</h3>
      <p className={styles['card-description']}>{description}</p>
    </div>
  );
};

export default CommuChild;