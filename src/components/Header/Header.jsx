import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../UI/Icon/Icon';
import styles from './Header.module.css';
import NavLinkItem from '../UI/NavLinkItem/NavLinkItem';
import Logo from '../UI/Logo/Logo';
import { LANDING } from '../../constants/routes';

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.Logo}>
        <Link to={LANDING}>
          <Logo />
        </Link>
      </div>
      <div className={styles.NavItems}>
        <NavLinkItem url={LANDING} exact>
          Home
        </NavLinkItem>
        <NavLinkItem url="/shop">Shop</NavLinkItem>
        <NavLinkItem url="/category">Category</NavLinkItem>
        <NavLinkItem url="/contact">Contact</NavLinkItem>
      </div>
      <div className={styles.IconBox}>
        <Icon icon="magnifier" className={styles.Icon} fontSize={18} />
        <Icon icon="user" className={styles.Icon} fontSize={18} />
        <Icon icon="heart" className={styles.Icon} fontSize={18} />
        <div className={styles.Cart}>
          <span className={styles.CartCounter}>12</span>
          <Icon icon="cart" className={styles.Icon} fontSize={18} />
        </div>
        <Icon icon="menu" className={styles.Icon} fontSize={18} />
      </div>
    </header>
  );
};

export default Header;
