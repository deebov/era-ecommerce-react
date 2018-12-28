import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from '../../../UI/Icon/Icon';
import styles from './WishlistButton.module.css';
import Spinner from '../../../UI/Spinner/Spinner';
import { WISHLIST } from '../../../../constants/routes';

const WishlistButton = ({ saved, loading, clicked, className }) => {
  const loadingClassName = loading ? styles.IconLoading : '';
  const containerClassNames = [
    styles.Container,
    loadingClassName,
    className,
  ].join(' ');

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
          <span>{saved ? 'View Wishlist' : 'Save'}</span>
        </ReactTooltip>
      </div>
    );
  }
  return (
    <div className={containerClassNames} onClick={!saved ? clicked : () => {}}>
      {saved ? (
        <Link to={WISHLIST} title="Wishlist">
          {button}
        </Link>
      ) : (
        button
      )}
    </div>
  );
};

WishlistButton.propTypes = {
  saved: PropTypes.bool,
  clicked: PropTypes.func,
  loading: PropTypes.bool,
};

export default WishlistButton;
