import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { Title as CartTitle } from '../../components/Cart/Title/Title';
import WishlistItems from '../../components/WishlistItems/WishlistItems';
import ResponsiveWrapper from '../../components/UI/ResponsiveWrapper/ResponsiveWrapper';
import * as actions from '../../store/actions';
import { WISHLIST as wishlistTitle } from '../../constants/titles';

class WishlistPage extends Component {
  addToCartHandler = id => {
    const { title, price, thumbnail } = this.props.wishlist[id];

    this.props.onAddToCart({
      amount: 1,
      id,
      product: {
        title,
        id,
        thumbnail,
        price,
      },
      updated: false,
    });
  };

  render() {
    return (
      <ResponsiveWrapper loading={this.props.loading}>
        <Helmet>
          <title>{wishlistTitle}</title>
        </Helmet>
        <CartTitle>Wishlist</CartTitle>
        <WishlistItems
          data={this.props.wishlist}
          loading={this.props.loading}
          onDeleteItem={this.props.onRemoveFromWishlist}
          cart={this.props.cart}
          addingToCart={this.props.isAddingToCart}
          addToCartClicked={this.addToCartHandler}
        />
      </ResponsiveWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist.wishlist,
    isAddingToCart: state.cart.isAddingToCart,
    cart: state.cart.cart,
    loading: state.wishlist.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveFromWishlist: id => dispatch(actions.removeFromWishlist(id)),
    onAddToCart: item => dispatch(actions.addToCart(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishlistPage);
