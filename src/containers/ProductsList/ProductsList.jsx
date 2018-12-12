import React, { Component } from 'react';

import ProductThumb from '../../components/ProductThumb/ProductThumb';
import styles from './ProductsList.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withFirebase } from '../../components/Firebase';
import { LISTS, ALL_PRODUCTS, CART, WISHLIST } from '../../constants/firebase';
import Notification from '../../components/UI/Notification/Notification';

class ProductsList extends Component {
  // _isMounted is needed for checking the component's status
  // this prevents calling setState on unMounted component
  _isMounted = false;

  state = {
    products: null,
    listID: null,
    cart: { _status: 'unfetched' },
    wishlist: { _status: 'unfetched' },
    loading: false,
    addingToCart: {},
    togglingWishlist: {},
    error: false
  };

  async componentDidMount() {
    this._isMounted = true;

    await this.loadData();
    this.loadWishlist();
    this.loadCart();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addToCartHandler = (e, item) => {
    e.preventDefault();
    if (this.state.cart._status === 'unfetched') {
      return;
    }
    const { id, title, thumbnails, price } = item;

    this.setState((state, props) => {
      return {
        addingToCart: { ...state.addingToCart, [id]: true }
      };
    });

    const db = this.props.firebase.db;
    const cartRef = db.collection(CART);
    const cartDocRef = cartRef.doc(id);

    cartDocRef
      .set({
        amount: 1,
        product: {
          id,
          price,
          title,
          thumbnail: thumbnails[0]
        },
        updated: false
      })
      .then(() =>
        // checking components's status
        this._isMounted
          ? this.setState((state, props) => {
              return {
                addingToCart: { ...state.addingToCart, [id]: false },
                cart: { ...state.cart, [item.id]: true }
              };
            })
          : null
      )
      .catch(e =>
        // checking components's status
        this._isMounted
          ? this.setState((state, props) => {
              return {
                error: true,
                addingToCart: { ...state.addingToCart, [id]: false }
              };
            })
          : null
      );
  };

  loadData = () => {
    // Return nothing if the ID is not valid
    const ID = this.props.id;

    if (!ID) {
      // Return nothing if product is loaded or
      // the IDs is same
      if (
        this.state.listID ||
        (this.state.listID && ID === this.state.listID)
      ) {
        return;
      }
      return;
    }

    const db = this.props.firebase.db;
    const listDocRef = db.collection(LISTS).doc(ID);
    const allProductsRef = db.collection(ALL_PRODUCTS);

    this.setState({ loading: true });

    return listDocRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          this.setState({ error: 'LIST', loading: false });
        }
        return doc.data();
      })
      .then(list => {
        const IDs = Object.keys(list);
        const promises = IDs.map(ID => {
          return allProductsRef.doc(ID).get();
        });
        return Promise.all(promises);
      })
      .then(value => {
        const products = value.map(e => e.data());
        // checking components's status
        if (this._isMounted) {
          this.setState({ products, listID: ID, loading: false });
        }
      })
      .catch(e =>
        // checking components's status
        this._isMounted ? this.setState({ error: true, loading: false }) : null
      );
  };

  loadWishlist = () => {
    const db = this.props.firebase.db;
    const wishlistRef = db.collection(WISHLIST);

    wishlistRef.get().then(querySnapshot => {
      const items = {};
      querySnapshot.forEach(doc => {
        items[doc.data().id] = true;
      });
      // checking components's status
      if (this._isMounted) {
        this.setState({ wishlist: items });
      }
    });
  };

  loadCart = () => {
    const db = this.props.firebase.db;
    const wishlistRef = db.collection(CART);

    wishlistRef.get().then(querySnapshot => {
      const items = {};
      querySnapshot.forEach(doc => {
        items[doc.data().product.id] = true;
      });
      // checking components's status
      if (this._isMounted) {
        this.setState({ cart: items });
      }
    });
  };

  toggleWishlistHandler = item => {
    // Stop executing if the wishlist is not loaded from the database
    if (this.state.wishlist._status === 'unfetched') {
      return;
    }

    const { id, title, price, thumbnail } = item;

    const db = this.props.firebase.db;
    const wishlistRef = db.collection(WISHLIST);
    const wishlistDocRef = wishlistRef.doc(id);

    // Set this true in order to components can show the Spinner
    this.setState((state, props) => {
      return {
        togglingWishlist: { ...state.togglingWishlist, [id]: true }
      };
    });

    let res = null;

    if (this.state.wishlist[id]) {
      // Delete if it is in wishlist
      res = wishlistDocRef.delete();
    } else {
      // Add if it is not in wishlist
      res = wishlistDocRef.set({
        id,
        title,
        price,
        thumbnail
      });
    }

    res
      .then(() =>
        // checking components's status
        this._isMounted
          ? this.setState((state, props) => {
              return {
                wishlist: { ...state.wishlist, [id]: !state.wishlist[id] },
                togglingWishlist: { ...state.togglingWishlist, [id]: false }
              };
            })
          : null
      )
      .catch(e =>
        // checking components's status
        this._isMounted
          ? this.setState((state, props) => {
              return {
                error: true,
                togglingWishlist: { ...state.togglingWishlist, [id]: false }
              };
            })
          : null
      );
  };

  errorConfirmedHandler = () => {
    this.setState({ error: false });
  };

  render() {
    // render the Spinner initially
    let productsList = <Spinner />;

    // render the real component if
    // products are received and valid
    if (this.state.products) {
      // const listsKeysArray = Object.keys
      const products = this.state.products.map(p => (
        <div className={styles.Column} key={p.id}>
          <ProductThumb
            item={p}
            onAddToCart={e => this.addToCartHandler(e, p)}
            addingToCart={this.state.addingToCart[p.id]}
            inCart={this.state.cart[p.id]}
            toggleWishlist={() =>
              this.toggleWishlistHandler({
                id: p.id,
                title: p.title,
                price: p.price,
                thumbnail: p.thumbnails[0]
              })
            }
            togglingWishlist={this.state.togglingWishlist[p.id]}
            inWishlist={this.state.wishlist[p.id]}
          />
        </div>
      ));

      productsList = (
        <section className={styles.Grid}>
          <div className={styles.Row}>{products}</div>
        </section>
      );
    }
    return (
      <div>
        {productsList}
        <Notification
          show={this.state.error}
          onOpen={this.errorConfirmedHandler}
          options={{ type: 'fail' }}
        />
      </div>
    );
  }
}

export default withFirebase(ProductsList);
