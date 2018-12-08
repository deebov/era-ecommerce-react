import React from 'react';

import styles from './Spinner.module.css';

const Spinner = ({ type = 'big', className = '' }) => {
  return (
    <div className={styles.Container}>
      <span className={[styles.Spinner, styles[type], className].join(' ')} />
    </div>
  );
};

export default Spinner;
