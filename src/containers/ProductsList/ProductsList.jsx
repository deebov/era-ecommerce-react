import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import ProductThumb from '../../components/ProductThumb/ProductThumb';
import styles from './ProductsList.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

const AnimatedContainer = posed.ul({
  enter: {
    opacity: 1,
    staggerChildren: 50,
    beforeChildren: true,
  },
  leave: {
    opacity: 0,
    staggerChildren: 20,
    staggerDirection: -1,
  },
  initialPose: 'leave',
});

const AnimatedChild = posed.li({
  enter: {
    x: '0%',
    y: 0,
    opacity: 1,
  },
  leave: {
    x: '-100%',
    y: 80,
    opacity: 0,
  },
});

class ProductsList extends Component {
  state = {
    isOpened: false,
  };
  async componentDidMount() {
    if (!this.props.lists[this.props.id]) {
      await this.props.onFetchList(this.props.id);
    }
    this.setState({ isOpened: true });
  }

  addToCartHandler = (e, item) => {
    e.preventDefault();

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
    const { id, title, price, thumbnails } = item;

    if (this.props.wishlist.hasOwnProperty(id)) {
      // Delete if it is in wishlist
      this.props.onRemoveFromWishlist(id);
    } else {
      // Add if it is not in wishlist
      this.props.onAddToWishlist({
        id,
        title,
        price,
        thumbnail: thumbnails[0],
      });
    }
  };

  get renderProducts() {
    return this.props.lists[this.props.id].map(p => {
      const id = p.id;
      // Sorry for so long name )
      const isTogglingWishlist =
        this.props.isAddingToWishlist[id] ||
        this.props.isRemovingFromWishlist[id];

      return (
        <AnimatedChild className={styles.Column} key={id}>
          <ProductThumb
            item={p}
            onAddToCart={e => this.addToCartHandler(e, p)}
            addingToCart={this.props.isAddingToCart[id]}
            inCart={this.props.cart.hasOwnProperty(id)}
            toggleWishlist={() => this.toggleWishlistHandler(p)}
            togglingWishlist={isTogglingWishlist}
            inWishlist={this.props.wishlist.hasOwnProperty(id)}
          />
        </AnimatedChild>
      );
    });
  }

  render() {
    const ID = this.props.id;
    // render the Spinner initially
    let productsList = <Spinner />;
    // render the real component if
    // products are received and valid
    if (this.props.lists[ID]) {
      productsList = (
        <section className={styles.Grid}>
          <AnimatedContainer
            pose={this.state.isOpened ? 'enter' : 'leave'}
            className={styles.Row}
            withParent={false}
          >
            {this.renderProducts}
          </AnimatedContainer>
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
  onFetchList: PropTypes.func,
  onAddToCart: PropTypes.func,
  onAddToWishlist: PropTypes.func,
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchList: id => dispatch(actions.fetchList(id)),
    onAddToCart: item => dispatch(actions.addToCart(item)),
    onRemoveFromWishlist: id => dispatch(actions.removeFromWishlist(id)),
    onAddToWishlist: item => dispatch(actions.addToWishlist(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
