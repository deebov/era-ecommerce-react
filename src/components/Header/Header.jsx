import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../UI/Icon/Icon';
import style from './Header.module.css';
import NavLinkItem from '../UI/NavLinkItem/NavLinkItem';
import Logo from '../UI/Logo/Logo';
import { LANDING } from '../../constants/routes';

const Header = () => {
  return (
    <header className={style.Header}>
      <div className={style.Logo}>
        <Link to={LANDING}>
          <Logo />
        </Link>
      </div>
      <div className={style.NavItems}>
        <NavLinkItem url={LANDING} exact>
          Home
        </NavLinkItem>
        <NavLinkItem url="/shop">Shop</NavLinkItem>
        <NavLinkItem url="/category">Category</NavLinkItem>
        <NavLinkItem url="/contact">Contact</NavLinkItem>
      </div>
      <div className={style.IconBox}>
        <Icon icon="magnifier" className={style.Icon} fontSize={18} />
        <Icon icon="user" className={style.Icon} fontSize={18} />
        <Icon icon="heart" className={style.Icon} fontSize={18} />
        <Icon icon="cart" className={style.Icon} fontSize={18} />
        <Icon icon="menu" className={style.Icon} fontSize={18} />
      </div>
    </header>
  );
};

export default Header;
