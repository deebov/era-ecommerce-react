import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Product.module.css';
import {
  RatingStars,
  Prices,
  ActionsBox,
  Ribbon
} from './components/components';

const Product = props => {
  const {
    item: { image, title, desc, rating, price, ribbonType, oldPrice }
  } = props;

  return (
    <div className={styles.Product}>
      <div className={styles.ProductInner}>
        <div className={styles.ImageBox}>
          <Ribbon type={ribbonType} />
          <Link to="/item?/:id">
            <img src={image} alt={desc} className={styles.Image} />
          </Link>
          <ActionsBox additionalClassName={styles.ActionsBox} />
        </div>
        <div className={styles.Details}>
          <h3 className={styles.Title}>{title}</h3>
          <RatingStars rating={rating} />
          <Prices price={price} oldPrice={oldPrice} />
        </div>
      </div>
    </div>
  );
};

export default Product;
