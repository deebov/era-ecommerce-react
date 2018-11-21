import React from 'react';

import styles from './ResponsiveWrapper.module.css';

const ResponsiveWrapper = props => {
  return <div className={styles.ResponsiveWrapper}>{props.children}</div>;
};

export default ResponsiveWrapper;

/**
 * This function returns the className 
 * so you can use it with any component
 */
export const getClassName = () => {
  return styles.ResponsiveWrapper;
};

