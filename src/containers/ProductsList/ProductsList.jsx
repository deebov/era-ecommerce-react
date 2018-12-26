import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductThumb from '../../components/ProductThumb/ProductThumb';
import styles from './ProductsList.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import withNotification from '../../hoc/withNotification/withNotification';

class ProductsList extends Component {
  componentDidMount() {
    this.props.onFetchList(this.props.id);
  }

  addToCartHandler = (e, item) => {
    e.preventDefault();
    if (!this.props.isAuthenticated) {
      this.props.onShowAuthModal();
      this.props.notify('Please, log in to continue', { type: 'success' });
      return;
    }
    const { id, title, thumbnails, price } = item;

    this.props.onAddToCart({
      amount: 1,
      id,
      product: {
        id,
        price,
        title,
        thumbnail: thumbnails[0],
      },
      updated: false,
    });
  };

  toggleWishlistHandler = item => {
    if (!this.props.isAuthenticated) {
      this.props.onShowAuthModal();
      this.props.notify('Please, log in to continue', { type: 'success' });
      return;
    }
    const { id, title, price, thumbnail } = item;

    if (this.props.wishlist.hasOwnProperty(id)) {
      // Delete if it is in wishlist
      this.props.onRemoveFromWishlist(id);
    } else {
      // Add if it is not in wishlist
      this.props.onAddToWishlist({
        id,
        title,
        price,
        thumbnail,
      });
    }
  };

  render() {
    const ID = this.props.id;
    // render the Spinner initially
    let productsList = <Spinner />;
    // render the real component if
    // products are received and valid
    if (this.props.lists[ID]) {
      const products = this.props.lists[ID].map(p => {
        const id = p.id;
        // Sorry for so long name )
        const isTogglingWishlist =
          this.props.isAddingToWishlist[id] ||
          this.props.isRemovingFromWishlist[id];

        return (
          <div className={styles.Column} key={id}>
            <ProductThumb
              item={p}
              onAddToCart={e => this.addToCartHandler(e, p)}
              addingToCart={this.props.isAddingToCart[id]}
              inCart={this.props.cart.hasOwnProperty(id)}
              toggleWishlist={() =>
                this.toggleWishlistHandler({
                  id: id,
                  title: p.title,
                  price: p.price,
                  thumbnail: p.thumbnails[0],
                })
              }
              togglingWishlist={isTogglingWishlist}
              inWishlist={this.props.wishlist.hasOwnProperty(id)}
            />
          </div>
        );
      });

      productsList = (
        <section className={styles.Grid}>
          <div className={styles.Row}>{products}</div>
        </section>
      );
    }
    return <div>{productsList}</div>;
  }
}

ProductsList.propTypes = {
  lists: PropTypes.object,
  id: PropTypes.string,
  wishlist: PropTypes.object,
  isAddingToWishlist: PropTypes.objectOf(PropTypes.bool),
  isRemovingFromWishlist: PropTypes.objectOf(PropTypes.bool),
  cart: PropTypes.object,
  isLoading: PropTypes.objectOf(PropTypes.bool),
  isAddingToCart: PropTypes.objectOf(PropTypes.bool),
  isAuthenticated: PropTypes.bool,
  onFetchList: PropTypes.func,
  onAddToCart: PropTypes.func,
  onAddToWishlist: PropTypes.func,
  onShowAuthModal: PropTypes.func,
  onRemoveFromWishlist: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    lists: state.lists.lists,
    wishlist: state.wishlist.wishlist,
    isAddingToWishlist: state.wishlist.isAddingToWishlist,
    isRemovingFromWishlist: state.wishlist.isRemovingFromWishlist,
    cart: state.cart.cart,
    isLoading: state.lists.isLoading,
    isAddingToCart: state.cart.isAddingToCart,
    isAuthenticated: state.auth.isAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchList: id => dispatch(actions.fetchList(id)),
    onAddToCart: item => dispatch(actions.addToCart(item)),
    onRemoveFromWishlist: id => dispatch(actions.removeFromWishlist(id)),
    onAddToWishlist: item => dispatch(actions.addToWishlist(item)),
    onShowAuthModal: () => dispatch(actions.switchShowAuth()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNotification(ProductsList));
