import React from 'react';
import PropTypes from 'prop-types';

import styles from './ResponsiveWrapper.module.css';

const ResponsiveWrapper = props => {
  const classNames = [styles.ResponsiveWrapper];
  if (props.loading) {
    classNames.push(styles.Loading);
  }
  return <div className={classNames.join(' ')}>{props.children}</div>;
};

ResponsiveWrapper.propTypes = {
  loading: PropTypes.bool,
};

export default ResponsiveWrapper;

/**
 * This function returns the className
 * so you can use it with any component
 */
export const getClassName = () => {
  return styles.ResponsiveWrapper;
};
