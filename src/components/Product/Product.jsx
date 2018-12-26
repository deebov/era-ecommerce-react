import React from 'react';

import styles from './Product.module.css';
import ResponsiveWrapper from '../UI/ResponsiveWrapper/ResponsiveWrapper';
import Images from './Images/Images';
import Details from './Details/Details';

const Product = ({ product }) => {
  return (
    <ResponsiveWrapper>
      <section className={styles.Container}>
        <Details item={product} />
        <Images images={product.images} />
      </section>
    </ResponsiveWrapper>
  );
};

export default Product;
