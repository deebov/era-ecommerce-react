import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../UI/Icon/Icon';
import styles from './Header.module.css';
import NavLinkItem from '../UI/NavLinkItem/NavLinkItem';
import Logo from '../UI/Logo/Logo';
import * as ROUTES from '../../constants/routes';
import { CART } from '../../constants/firebase';
import { withFirebase } from '../Firebase';

class Header extends Component {
  state = {
    cartCount: null
  };

  componentDidMount() {
    this.fetchCartCount();
  }

  componentWillUnmount() {
    this.unsubcribeListener();
  }

  fetchCartCount = () => {
    const db = this.props.firebase.db;
    const cartRef = db.collection(CART);

    this.unsubcribeListener = cartRef.onSnapshot(querySnapshot =>
      this.setState({ cartCount: querySnapshot.size })
    );
  };

  render() {
    return (
      <header className={styles.Header}>
        <div className={styles.Logo}>
          <Link to={ROUTES.LANDING}>
            <Logo />
          </Link>
        </div>
        <div className={styles.NavItems}>
          <NavLinkItem url={ROUTES.LANDING} exact>
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
          <Link to={ROUTES.CART} className={styles.Link}>
            <div className={styles.Cart}>
              {this.state.cartCount ? (
                <span className={styles.CartCounter}>
                  {this.state.cartCount}
                </span>
              ) : null}
              <Icon icon="cart" className={styles.Icon} fontSize={18} />
            </div>
          </Link>
          <Icon icon="menu" className={styles.Icon} fontSize={18} />
        </div>
      </header>
    );
  }
}

export default withFirebase(Header);
