import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import styles from './ActionsBox.module.css';
import Icon from '../../UI/Icon/Icon';
import Spinner from '../../UI/Spinner/Spinner';
import { CART } from '../../../constants/routes';

const ActionsBox = props => {
  const { additionalClassName, addedToCart, fetching = true, fetched } = props;

  const AddToCart = (
    <button
      onClick={!fetched ? addedToCart : null}
      className={styles.AddToCart}
      disabled={fetching}
    >
      {!fetched ? <span>Add to cart</span> : <Link to={CART}>View Cart</Link>}
      {fetching ? <Spinner className={styles.Spinner} type="small" /> : null}
    </button>
  );

  return (
    <div className={[styles.ActionsBox, additionalClassName].join(' ')}>
      {AddToCart}
      <div className={styles.ActionIcons}>
        <span data-tip data-for="bookmark">
          <Icon icon={`heart ${styles.Icon}`} />
        </span>
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
          <span>Save</span>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default ActionsBox;
