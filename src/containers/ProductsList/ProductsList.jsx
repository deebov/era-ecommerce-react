import React, { useState, useEffect } from 'react';
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

const ProductsList = props => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    async function fetchList(id) {
      if (!props.lists[props.id]) {
        await props.onFetchList(props.id);
        setIsOpened(true);
      }
    }

    fetchList(props.id);
  }, [props.id]);

  const addToCartHandler = (e, item) => {
    e.preventDefault();

    const { id, title, thumbnails, price } = item;

    props.onAddToCart({
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

  const toggleWishlistHandler = item => {
    const { id, title, price, thumbnails } = item;

    if (props.wishlist.hasOwnProperty(id)) {
      // Delete if it is in wishlist
      props.onRemoveFromWishlist(id);
    } else {
      // Add if it is not in wishlist
      props.onAddToWishlist({
        id,
        title,
        price,
        thumbnail: thumbnails[0],
      });
    }
  };

  const renderProducts = () => {
    return props.lists[props.id].map(p => {
      const id = p.id;
      // Sorry for so long name )
      const isTogglingWishlist =
        props.isAddingToWishlist[id] || props.isRemovingFromWishlist[id];

      return (
        <AnimatedChild className={styles.Column} key={id}>
          <ProductThumb
            item={p}
            onAddToCart={e => addToCartHandler(e, p)}
            addingToCart={props.isAddingToCart[id]}
            inCart={props.cart.hasOwnProperty(id)}
            toggleWishlist={() => toggleWishlistHandler(p)}
            togglingWishlist={isTogglingWishlist}
            inWishlist={props.wishlist.hasOwnProperty(id)}
          />
        </AnimatedChild>
      );
    });
  };

  const ID = props.id;
  // render the Spinner initially
  let productsList = <Spinner />;
  // render the real component if
  // products are received and valid
  if (props.lists[ID]) {
    productsList = (
      <section className={styles.Grid}>
        <AnimatedContainer
          pose={isOpened ? 'enter' : 'leave'}
          className={styles.Row}
          withParent={false}
        >
          {renderProducts()}
        </AnimatedContainer>
      </section>
    );
    console.log('aaaaaaaaaaaaa');
  }

  return <div>{productsList}</div>;
};

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
