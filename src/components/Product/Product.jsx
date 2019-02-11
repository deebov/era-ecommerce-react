import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import styles from './Product.module.css';
import ResponsiveWrapper from '../UI/ResponsiveWrapper/ResponsiveWrapper';
import Images from './Images/Images';
import Details from './Details/Details';

const AnimatedContainer = posed.section({
  enter: {
    opacity: 1,
    staggerChildren: 200,
  },
  exit: {
    opacity: 0,
  },
});

const Product = ({ product }) => {
  return (
    <ResponsiveWrapper>
      <AnimatedContainer className={styles.Container}>
        <Details item={product} />
        <Images images={product.images} />
      </AnimatedContainer>
    </ResponsiveWrapper>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
