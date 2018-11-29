import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './ActionsBox.module.css';
import Icon from '../../UI/Icon/Icon';

const ActionsBox = props => {
  const { additionalClassName } = props;

  return (
    <div className={[styles.ActionsBox, additionalClassName].join(' ')}>
      <button className={styles.AddToCart}>Add to cart</button>
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
