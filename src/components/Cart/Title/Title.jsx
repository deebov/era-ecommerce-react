import React from 'react';

import styles from './Title.module.css';
import { getClassName } from '../../UI/ResponsiveWrapper/ResponsiveWrapper';

export const Title = ({ children }) => {
  return (
    <div className={[styles.Container, getClassName()].join(' ')}>
      <h1 className={styles.Title}>{children}</h1>
    </div>
  );
};
