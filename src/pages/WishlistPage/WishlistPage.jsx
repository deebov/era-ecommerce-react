import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { Title as CartTitle } from '../../components/Cart/Title/Title';
import WishlistItems from '../../components/WishlistItems/WishlistItems';
import { withFirebase } from '../../components/Firebase';
import { WISHLIST, CART } from '../../constants/firebase';
import ResponsiveWrapper from '../../components/UI/ResponsiveWrapper/ResponsiveWrapper';
import Notification from '../../components/UI/Notification/Notification';

class WishlistPage extends Component {
  state = {
    wishlist: [],
    cart: { _status: 'unfetched' },
    addingToCart: {},
    loading: false,
    error: false,
    errorConfirmed: false
  };

  async componentDidMount() {
    await this.listenForWishlist();
    this.loadCart();
  }

  componentWillUnmount() {
    this.unsubcribeListener();
  }

  listenForWishlist = () => {
    const db = this.props.firebase.db;
    const wishlistRef = db.collection(WISHLIST);

    this.setState({ loading: true });
    return new Promise(resolve => {
      this.unsubcribeListener = wishlistRef.onSnapshot(
        querySnapshot => {
          const items = [];

          querySnapshot.forEach(doc => {
            items.push(doc.data());
          });
          this.setState({ wishlist: items, loading: false });
          resolve();
        },
        e => this.setState({ error: true })
      );
    });
  };

  deleteItemHandler = id => {
    const db = this.props.firebase.db;
    const wishlistRef = db.collection(WISHLIST);
    const wishlistDocRef = wishlistRef.doc(id);

    wishlistDocRef
      .delete()
      .then()
      .catch(e => this.setState({ error: true }));
  };

  addToCartHandler = id => {
    // Stop executing if the cart is not fetched yet
    if (this.state.cart._status === 'unfetched') {
      return;
    }

    this.setState((state, props) => {
      return { addingToCart: { ...state.addingToCart, [id]: true } };
    });

    const { title, price, thumbnail } = this.state.wishlist.filter(
      e => e.id === id
    )[0];

    const db = this.props.firebase.db;
    const cartRef = db.collection(CART);
    const cartDocRef = cartRef.doc(id);

    cartDocRef
      .set({
        amount: 1,
        product: {
          title,
          id,
          thumbnail,
          price
        },
        updated: false
      })
      .then(() => {
        this.setState((state, props) => {
          return {
            cart: { ...state.cart, [id]: true },
            addingToCart: { ...state.addingToCart, [id]: false }
          };
        });
      })
      .catch(e => {
        this.setState((state, props) => {
          return {
            error: true,
            addingToCart: { ...state.addingToCart, [id]: false }
          };
        });
      });
  };

  loadCart = () => {
    const db = this.props.firebase.db;
    const wishlistRef = db.collection(CART);

    wishlistRef
      .get()
      .then(querySnapshot => {
        const items = {};

        querySnapshot.forEach(doc => {
          items[doc.data().product.id] = doc.data();
        });

        this.setState({ cart: { ...items, _status: 'fetched' } });
      })
      .catch(e => this.setState({ error: true }));
  };

  errorConfirmedHandler = () => {
    this.setState({ error: false });
  };

  render() {
    return (
      <ResponsiveWrapper loading={this.state.loading}>
        <Helmet>
          <title> Your Wishlist ❤️</title>
        </Helmet>
        <CartTitle>Wishlist</CartTitle>
        <WishlistItems
          data={this.state.wishlist}
          loading={this.state.loading}
          onDeleteItem={this.deleteItemHandler}
          cart={this.state.cart}
          addingToCart={this.state.addingToCart}
          addToCartClicked={this.addToCartHandler}
        />
        <Notification
          show={this.state.error}
          options={{ type: 'fail' }}
          onOpen={this.errorConfirmedHandler}
        />
      </ResponsiveWrapper>
    );
  }
}

export default withFirebase(WishlistPage);
