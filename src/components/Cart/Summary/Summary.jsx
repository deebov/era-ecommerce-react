import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import styles from './Summary.module.css';

export const Summary = ({ totalPrice, checkoutClicked, disableCheckout }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.TotalPriceBox}>
        <span className={styles.TotalPrice}>Total</span>
        <span className={styles.TotalPrice}>&pound;{totalPrice}</span>
      </div>
      <Button
        clicked={checkoutClicked}
        theme="big"
        className={styles.Button}
        disabled={disableCheckout}
      >
        proceed to checkout
      </Button>
    </div>
  );
};

Summary.propTypes = {
  totalPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disableCheckout: PropTypes.bool,
  checkoutClicked: PropTypes.func,
};
