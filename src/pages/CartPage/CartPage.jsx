import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

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
    totalPrice: 0,
    loading: false,
    error: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(nextProps.cart, prevState.oldCart)) {
      return {
        cart: nextProps.cart,
        oldCart: nextProps.cart,
        totalPrice: CartPage.calcTotalPrice(nextProps.cart)
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
      total_price: +updatedTotalPrice.toFixed(2)
    };

    data[id] = updatedItem;

    this.setState({
      cart: data,
      totalPrice: CartPage.calcTotalPrice(data)
    });
  };

  static calcTotalPrice = data => {
    // data is object. so I need to convert
    // it to array be calculation
    return _.sumBy(_.values(data), 'total_price').toFixed(2);
  };

  render() {
    return (
      <ResponsiveWrapper loading={this.props.isLoading}>
        <Helmet>
          <title>{cartTitle}</title>
        </Helmet>
        <Title>Cart</Title>
        <Items
          data={this.state.cart}
          loading={this.props.isLoading}
          onDeleteItem={this.props.onRemoveFromCart}
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

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    isLoading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveFromCart: id => dispatch(actions.removeFromCart(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
