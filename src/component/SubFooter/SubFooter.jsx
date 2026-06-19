import React from "react";
import { Link } from 'react-router-dom';
import styles from './SubFooter.module.css'

const SubFooter = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.container}>
        <h2 className={styles.ctaTitle}>
          Pellentesque suscipit <br />
          fringilla libero eu.
        </h2>
        <Link to="/product" className={styles.demoLink}>
          Get a Demo →
        </Link>
      </div>
    </div>
  );
};

export default SubFooter;