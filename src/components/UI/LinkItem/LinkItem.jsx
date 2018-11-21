import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkItem.module.css';

const LinkItem = props => {
  const { url, exact } = props;
  return (
    <div>
      <Link
        to={url}
        exact={exact}
        className={styles.Link}
      >
        {props.children}
      </Link>
    </div>
  );
};

export default LinkItem;
