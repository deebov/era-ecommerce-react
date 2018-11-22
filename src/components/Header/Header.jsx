import React from 'react';

import Icon from '../UI/Icon/Icon';
import style from './Header.module.css';
import NavLinkItem from '../UI/NavLinkItem/NavLinkItem';
import Logo from '../UI/Logo/Logo';
const Header = () => {
  return (
    <header className={style.Header}>
      <div className={style.Logo}>
        <Logo />
      </div>
      <div className={style.NavItems}>
        <NavLinkItem url="/" exact>
          Home
        </NavLinkItem>
        <NavLinkItem url="/shop">Shop</NavLinkItem>
        <NavLinkItem url="/category">Category</NavLinkItem>
        <NavLinkItem url="/contact">Contact</NavLinkItem>
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
