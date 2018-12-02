import React from 'react';

import styles from './ProductSummary.module.css';
import ResponsiveWrapper from '../../containers/ResponsiveWrapper/ResponsiveWrapper';
import ProductImages from '../ProductImages/ProductImages';
import ProductDetails from '../ProductDetails/ProductDetails';

const ProductSummary = props => {

  return (
    <ResponsiveWrapper>
      <section className={styles.Container}>
        <ProductDetails item={props.product} />
        <ProductImages />
      </section>
    </ResponsiveWrapper>
  );
};

export default ProductSummary;
