import React from 'react';
import PropTypes from 'prop-types';

import styles from './Prices.module.css';

/**
 * This component defines if there was oldPrice
 * if so it will return underlined oldPrice and
 * new one
 */
const Prices = props => {
  const { oldPrice, price, className } = props;
  let { fSize } = props;
  fSize = fSize ? fSize + 'px' : '14px';
  // Initial component
  let priceEl = (
    <div
      className={[styles.PriceBox, className].join(' ')}
      style={{ fontSize: fSize || '' }}
    >
      <p className={styles.Price}>&pound;{price}</p>
    </div>
  );
  // Change the initial component if there was oldPrice
  if (oldPrice > 0) {
    priceEl = (
      <div
        className={[styles.PriceBox, className].join(' ')}
        style={{ fontSize: fSize || '' }}
      >
        <span className={[styles.OldPrice, styles.Price].join(' ')}>
          &pound;{oldPrice}
        </span>
        <span className={[styles.NewPrice, styles.Price].join(' ')}>
          &pound;{price}
        </span>
      </div>
    );
  }

  return priceEl;
};

Prices.propTypes = {
  price: PropTypes.number,
  oldPrice: PropTypes.number,
  className: PropTypes.string,
};

export default Prices;
