import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Constants
import * as ROUTES from '../../constants/routes';
// Styles
import styles from './Header.module.css';
// Components
import Icon from '../UI/Icon/Icon';
import NavLinkItem from '../UI/NavLinkItem/NavLinkItem';
import Logo from '../UI/Logo/Logo';

import * as actions from '../../store/actions';

class Header extends Component {
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
          <Icon icon="magnifier" className={styles.Icon} fontSize={19} />
          <div onClick={this.props.onShowAuthModal}>
            <Icon icon="user" className={styles.Icon} fontSize={19} />
          </div>
          <Link to={ROUTES.WISHLIST} className={styles.Link}>
            <Icon icon="heart" className={styles.Icon} fontSize={19} />
          </Link>
          <Link to={ROUTES.CART} className={styles.Link}>
            <div className={styles.Cart}>
              {this.props.cartCount ? (
                <span className={styles.CartCounter}>
                  {this.props.cartCount}
                </span>
              ) : null}
              <Icon icon="cart" className={styles.Icon} fontSize={19} />
            </div>
          </Link>
          <Icon icon="menu" className={styles.Icon} fontSize={18} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartCount: Object.keys(state.cart.cart).length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowAuthModal: () => dispatch(actions.switchShowAuth())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
