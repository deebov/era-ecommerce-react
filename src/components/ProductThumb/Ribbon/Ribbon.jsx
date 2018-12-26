import React from 'react';

import styles from './Ribbon.module.css';

const Ribbon = ({ type }) => {
  // Return nothing if type is not valid
  if (!type) {
    return <div />;
  }
  type = type.toLowerCase();

  const classNames = [styles.Ribbon];
  let ribbonText = '';

  switch (type) {
    case 'hot':
      classNames.push(styles.RibbonHot);
      ribbonText = 'Hot';
      break;
    case 'sale':
      classNames.push(styles.RibbonSale);
      ribbonText = 'Sale';
      break;
    case 'outOfStock':
      classNames.push(styles.RibbonOutStock);
      ribbonText = 'Out of Stock';
      break;
    default:
      break;
  }

  return <span className={classNames.join(' ')}>{ribbonText}</span>;
};

export default Ribbon;
