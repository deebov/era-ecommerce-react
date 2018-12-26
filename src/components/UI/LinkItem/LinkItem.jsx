import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './LinkItem.module.css';

const LinkItem = props => {
  const { url, exact } = props;
  return (
    <div>
      <Link to={url} exact={exact} className={styles.Link} title={props.title}>
        {props.children}
      </Link>
    </div>
  );
};

LinkItem.propTypes = {
  url: PropTypes.string,
  exact: PropTypes.bool,
};

export default LinkItem;
