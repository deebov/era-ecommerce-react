import React from 'react';

import Icon from '../UI/Icon/Icon';
import style from './Header.module.css';
import LinkItem from '../LinkItem/LinkItem';
import Logo from '../UI/Logo/Logo';
const Header = () => {
  return (
    <header className={style.Header}>
      <div className={style.Logo}>
        <Logo />
      </div>
      <div className={style.NavItems}>
        <LinkItem url="/" exact>
          Home
        </LinkItem>
        <LinkItem url="/shop">Shop</LinkItem>
        <LinkItem url="/category">Category</LinkItem>
        <LinkItem url="/contact">Contact</LinkItem>
      </div>
      <div className={style.IconBox}>
        <Icon iconClassNames={`lnr lnr-magnifier ${style.Icon}`} />
        <Icon iconClassNames={`lnr lnr-user ${style.Icon}`} />
        <Icon iconClassNames={`lnr lnr-heart ${style.Icon}`} />
        <Icon iconClassNames={`lnr lnr-cart ${style.Icon}`} />
        <Icon iconClassNames={`lnr lnr-menu ${style.Icon}`} />
      </div>
    </header>
  );
};

export default Header;
