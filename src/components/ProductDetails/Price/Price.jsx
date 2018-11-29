import React from 'react';

import styles from './Price.module.css';
import Prices from '../../ProductThumb/Prices/Prices';

const Price = ({ price, oldPrice }) => {
  return (
    <div className={styles.Price}>
      <Prices price={price} oldPrice={oldPrice} fSize={24} />
    </div>
  );
};

export default Price;
