import React from 'react';

import styles from './Spinner.module.css';

const Spinner = ({ type = 'big' }) => {
  return (
    <div className={styles.Container}>
      <span className={[styles.Spinner, styles[type]].join(' ')} />
    </div>
  );
};

export default Spinner;
