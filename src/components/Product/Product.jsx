import React from 'react';
import PropTypes from 'prop-types';

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

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
