import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavLinkItem.module.css';

const NavLinkItem = props => {
  const { url, exact } = props;

  return (
    <div>
      <NavLink
        to={url}
        exact={exact}
        activeClassName={styles.NavLinkActive}
        className={styles.NavLink}
      >
        {props.children}
      </NavLink>
    </div>
  );
};

export default NavLinkItem;
