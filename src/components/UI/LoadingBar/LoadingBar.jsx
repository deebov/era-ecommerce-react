import React from 'react';

import styles from './LoadingBar.module.css';

const LoadingBar = ({ show }) => {
  return (
    <div
      className={[styles.LoadingBar, show ? styles.loading : ''].join(' ')}
    />
  );
};

export default LoadingBar;
