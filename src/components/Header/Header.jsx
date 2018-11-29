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
        <Icon icon="magnifier" className={style.Icon} />
        <Icon icon="user" className={style.Icon} />
        <Icon icon="heart" className={style.Icon} />
        <Icon icon="cart" className={style.Icon} />
        <Icon icon="menu" className={style.Icon} />
      </div>
    </header>
  );
};

export default Header;
