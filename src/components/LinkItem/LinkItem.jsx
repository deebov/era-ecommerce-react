import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './LinkItem.module.css';

const LinkItem = props => {
  const { url, exact } = props;

  return (
    <div>
      <NavLink
        to={url}
        exact={exact}
        activeClassName={style.LinkActive}
        className={style.Link}
      >
        {props.children}
      </NavLink>
    </div>
  );
};

export default LinkItem;
