import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProductThumb.module.css';
import Ribbon from './Ribbon/Ribbon';
import RatingStars from './RatingStars/RatingStars';
import ActionsBox from './ActionsBox/ActionsBox';
import Prices from './Prices/Prices';
import { ITEM } from '../../constants/routes';
import PreloadImage from '../UI/PreloadImage/PreloadImage';
import PreloadLinkProduct from '../UI/PreloadLink/Product/Product';

const ProductThumb = props => {
  const {
    item: { thumbnails, title, rating, price, ribbonType, oldPrice, id },
  } = props;

  const {
    inWishlist,
    onAddToCart,
    addingToCart,
    inCart,
    toggleWishlist,
    togglingWishlist,
  } = props;

  return (
    <div className={styles.Product}>
      <div className={styles.ProductInner}>
        <div className={styles.ImageBox}>
          <Ribbon type={ribbonType} />
          <PreloadLinkProduct to={`${ITEM}/${id}`} id={id} title={title}>
            <PreloadImage
              src={thumbnails[0]}
              alt={title}
              className={styles.Image}
              loadingClass={styles.LoadingImage}
            />
          </PreloadLinkProduct>
          <ActionsBox
            additionalClassName={styles.ActionsBox}
            addedToCart={onAddToCart}
            addingToCart={addingToCart}
            inCart={inCart}
            toggledWishlist={toggleWishlist}
            togglingWishlist={togglingWishlist}
            inWishlist={inWishlist}
          />
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

ProductThumb.propTypes = {
  inWishlist: PropTypes.bool,
  onAddToCart: PropTypes.func,
  addingToCart: PropTypes.bool,
  inCart: PropTypes.bool,
  toggleWishlist: PropTypes.func,
  togglingWishlist: PropTypes.bool,
  item: PropTypes.object,
};

export default ProductThumb;
