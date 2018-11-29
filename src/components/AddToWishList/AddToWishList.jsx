import React from 'react';
import ReactTooltip from 'react-tooltip';

import Icon from '../UI/Icon/Icon';
import styles from './AddToWishList.module.css';
import Spinner from '../UI/Spinner/Spinner';

const AddToWishList = ({ saved, loading, clicked }) => {
  const loadingClassName = loading ? styles.IconLoading : '';
  const containerClassNames = [styles.Container, loadingClassName].join(' ');

  let button = <Spinner type="small" />;

  if (!loading) {
    button = (
      <div>
        <span data-tip data-for="btn">
          <Icon
            icon={`android-favorite${!saved ? '-outline' : ''}`}
            className={`${styles.Icon} ${saved ? styles.IconSelected : ''} `}
            type="ionic"
          />
        </span>
        <ReactTooltip
          id="btn"
          type="dark"
          className={styles.Tooltip}
          effect="solid"
        >
          <span>{saved ? 'View Wishlist' : 'Quick View'}</span>
        </ReactTooltip>
      </div>
    );
  }
  return (
    <div className={containerClassNames} onClick={clicked}>
      {button}
    </div>
  );
};

export default AddToWishList;
