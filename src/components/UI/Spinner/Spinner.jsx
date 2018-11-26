import React from 'react';

import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.Container}>
      <span className={styles.Spinner} />
    </div>
  );
};

export default Spinner;
