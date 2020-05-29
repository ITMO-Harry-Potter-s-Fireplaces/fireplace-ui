import React from 'react';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderBar} />
      <div className={styles.loaderBar} />
      <div className={styles.loaderBar} />
      <div className={styles.loaderBar} />
      <div className={styles.loaderBar} />
      <div className={styles.loaderBall} />
    </div>
  );
}

export default Loader;
