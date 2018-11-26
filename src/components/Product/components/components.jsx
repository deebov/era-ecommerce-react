import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './components.module.css';
import Icon from '../../UI/Icon/Icon';

export const Ribbon = ({ type }) => {
  if (!type) {
    return;
  }
  type = type.toLowerCase();

  const classNames = [styles.Ribbon];
  let ribbonText = '';

  switch (type) {
    case 'hot':
      classNames.push(styles.RibbonHot);
      ribbonText = 'Hot';
      break;
    case 'sale':
      classNames.push(styles.RibbonSale);
      ribbonText = 'Sale';
      break;
    case 'outOfStock':
      classNames.push(styles.RibbonOutStock);
      ribbonText = 'Out of Stock';
      break;
    default:
      break;
  }

  return <span className={classNames.join(' ')}>{ribbonText}</span>;
};
/**
 * This component generates the rating
 * stars by item's rate
 */
export const RatingStars = ({ rating, ratingLimit = 5 }) => {
  const stars = [];

  for (let i = 0; i < ratingLimit; i++) {
    if (rating > i) {
      stars.push(
        <span key={i} className={[styles.StarFilled, styles.Star].join(' ')} />
      );
    } else {
      stars.push(<span key={i} className={styles.Star} />);
    }
  }

  return stars;
};

/**
 * This component defines if there was oldPrice
 * if so it will return underlined oldPrice and
 * new one
 */
export const Prices = props => {
  const { oldPrice, price } = props;

  // Initial component
  let priceEl = (
    <div className={styles.PriceBox}>
      <p className={styles.Price}>&pound;{price}</p>
    </div>
  );
  // Change the initial component if there was oldPrice
  if (oldPrice > 0) {
    priceEl = (
      <div className={styles.PriceBox}>
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

export const ActionsBox = props => {
  const { additionalClassName } = props;

  return (
    <div className={[styles.ActionsBox, additionalClassName].join(' ')}>
      <button className={styles.AddToCart}>Add to cart</button>
      <div className={styles.ActionIcons}>
        <span data-tip data-for="bookmark">
          <Icon iconClassNames={`lnr lnr-heart ${styles.Icon}`} />
        </span>
        <span data-tip data-for="quickView">
          <Icon iconClassNames={`lnr lnr-frame-expand ${styles.Icon}`} />
        </span>
        <ReactTooltip
          id="quickView"
          type="dark"
          className={styles.Tooltip}
          effect="solid"
        >
          <span>Quick View</span>
        </ReactTooltip>
        <ReactTooltip
          id="bookmark"
          type="dark"
          className={styles.Tooltip}
          effect="solid"
        >
          <span>Save</span>
        </ReactTooltip>
      </div>
    </div>
  );
};
