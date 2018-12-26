import React from 'react';
import PropTypes from 'prop-types';

import styles from './Price.module.css';
import ProductThumbPrices from '../../../ProductThumb/Prices/Prices';

const Price = ({ price, oldPrice }) => {
  return (
    <div className={styles.Price}>
      <ProductThumbPrices price={price} oldPrice={oldPrice} fSize={24} />
    </div>
  );
};

Price.propTypes = {
  price: PropTypes.number,
  oldPrice: PropTypes.number,
};

export default Price;
