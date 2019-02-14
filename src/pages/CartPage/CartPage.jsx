import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { Title, Summary, Items } from '../../components/Cart/Cart';
import ResponsiveWrapper from '../../components/UI/ResponsiveWrapper/ResponsiveWrapper';
import * as actions from '../../store/actions';
import { CART as cartTitle } from '../../constants/titles';

/**
 * TODO
 * Move the calculations
 * to server
 */

class CartPage extends Component {
  state = {
    cart: this.props.cart,
    oldCart: this.props.cart,
    totalPrice: CartPage.calcTotalPrice(this.props.cart),
    loading: false,
    error: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Everytime the component receives
    // props this function compares the mirror
    // of the cart and the current cart.
    // If the cart was updated, the function
    // calculates the totalPrice and store the new mirror
    const isCartsEqual =
      JSON.stringify(nextProps.cart) === JSON.stringify(prevState.oldCart);
    if (!isCartsEqual) {
      return {
        cart: nextProps.cart,
        oldCart: nextProps.cart,
        totalPrice: CartPage.calcTotalPrice(nextProps.cart),
      };
    } else return null;
  }

  counterHandler = (e, id, type) => {
    const data = { ...this.state.cart };
    const oldItem = data[id];
    const oldCounter = oldItem.amount;
    let updatedCounter = oldCounter;
    let updatedTotalPrice = oldItem.total_price;

    if (type === 'inc') {
      updatedCounter += 1;
      updatedTotalPrice += oldItem.product.price;
    }

    if (type === 'dec') {
      if (updatedCounter > 1) {
        updatedCounter -= 1;
        updatedTotalPrice -= oldItem.product.price;
      }
    }

    if (type === 'change') {
      const val = +e.target.value;
      if (val >= 0) {
        updatedCounter = Math.abs(val);
        updatedTotalPrice = updatedCounter * oldItem.product.price;
      }
      if (val > 600) {
        updatedCounter = 600;
        updatedTotalPrice = updatedCounter * oldItem.product.price;
      }
    }

    const updatedItem = {
      ...oldItem,
      amount: updatedCounter,
      total_price: +updatedTotalPrice.toFixed(2),
    };

    data[id] = updatedItem;

    this.setState({
      cart: data,
      totalPrice: CartPage.calcTotalPrice(data),
    });
  };

  static calcTotalPrice = data => {
    // data is object. so I need to convert
    // it to array

    let sum = 0;

    Object.values(data).forEach(p => {
      if (p.total_price) {
        sum += p.total_price;
      } else {
        sum += p.amount * p.product.price;
      }
    });
    return sum.toFixed(2);
  };

  render() {
    return (
      <ResponsiveWrapper loading={this.props.isLoading}>
        <Helmet defer={false}>
          <title>{cartTitle}</title>
        </Helmet>
        <Title>Cart</Title>
        <Items
          data={this.state.cart}
          loading={this.props.isLoading}
          onDeleteItem={this.props.onRemoveFromCart}
          isRemovingFromCart={this.props.isRemovingFromCart}
          incCounterClicked={(e, id) => this.counterHandler(e, id, 'inc')}
          decCounterClicked={(e, id) => this.counterHandler(e, id, 'dec')}
          onCounterChange={(e, id) => this.counterHandler(e, id, 'change')}
        />
        <Summary
          totalPrice={this.state.totalPrice}
          disableCheckout={!Object.keys(this.state.cart).length}
        />
      </ResponsiveWrapper>
    );
  }
}

CartPage.propTypes = {
  cart: PropTypes.object,
  isLoading: PropTypes.bool,
  onRemoveFromCart: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    isLoading: state.cart.loading,
    isRemovingFromCart: state.cart.isRemovingFromCart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveFromCart: id => dispatch(actions.removeFromCart(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
