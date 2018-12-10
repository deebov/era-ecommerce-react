import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import styles from './ActionsBox.module.css';
import Icon from '../../UI/Icon/Icon';
import Spinner from '../../UI/Spinner/Spinner';
import { CART } from '../../../constants/routes';

const ActionsBox = props => {
  const {
    additionalClassName,
    addedToCart,
    addingToCart,
    inCart,
    inWishlist,
    toggledWishlist,
    togglingWishlist
  } = props;

  const addToCart = (
    <button
      onClick={!inCart ? addedToCart : null}
      className={styles.AddToCart}
      disabled={addingToCart}
    >
      {!inCart ? <span>Add to cart</span> : <Link to={CART}>View Cart</Link>}
      {addingToCart ? (
        <Spinner className={styles.Spinner} type="small" />
      ) : null}
    </button>
  );

  const toggleWishlist = (
    <span
      data-tip
      data-for="bookmark"
      className={styles.ToggleWishlist}
      onClick={!togglingWishlist ? toggledWishlist : () => {}}
    >
      {togglingWishlist ? (
        <Spinner className={styles.WishlistSpinner} type="small" />
      ) : inWishlist ? (
        <Icon type="ionic" color="#c33" icon={`ios-heart ${styles.Icon}`} fontSize={18} />
      ) : (
        <Icon type="ionic" icon={`ios-heart-outline ${styles.Icon}`} fontSize={18} />
      )}
    </span>
  );

  return (
    <div className={[styles.ActionsBox, additionalClassName].join(' ')}>
      {addToCart}
      <div className={styles.ActionIcons}>
        {toggleWishlist}
        <span data-tip data-for="quickView">
          <Icon icon="frame-expand" className={styles.Icon} />
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
          <span>{inWishlist ? 'Remove' : 'Save'}</span>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default ActionsBox;
