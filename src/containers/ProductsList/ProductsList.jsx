import React, { Component } from 'react';

import ProductThumb from '../../components/ProductThumb/ProductThumb';
import styles from './ProductsList.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withFirebase } from '../../components/Firebase';
import { LISTS, ALL_PRODUCTS, CART, WISHLIST } from '../../constants/firebase';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      listID: null,
      cart: { _status: 'unfetched' },
      wishlist: { _status: 'unfetched' },
      loading: false,
      addingToCart: {},
      togglingWishlist: {},
      error: false
    };

    this._isMounted = false;

    this.loadData = this.loadData.bind(this);
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.toggleWishlistHandler = this.toggleWishlistHandler.bind(this);
    this.loadWishlist = this.loadWishlist.bind(this);
    this.loadCart = this.loadCart.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;

    await this.loadData();
    this.loadWishlist();
    this.loadCart();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addToCartHandler(e, item) {
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
        this.setState((state, props) => {
          return {
            addingToCart: { ...state.addingToCart, [id]: false },
            cart: { ...state.cart, [item.id]: true }
          };
        })
      )
      .catch(e =>
        this.setState((state, props) => {
          return {
            error: true,
            addingToCart: { ...state.addingToCart, [id]: false }
          };
        })
      );
  }

  loadData() {
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
        if (this._isMounted) {
          this.setState({ products, listID: ID, loading: false });
        }
      })
      .catch(e => {
        this.setState({ error: true, loading: false });
      });
  }

  loadWishlist() {
    const db = this.props.firebase.db;
    const wishlistRef = db.collection(WISHLIST);

    wishlistRef.get().then(querySnapshot => {
      const items = {};
      querySnapshot.forEach(doc => {
        items[doc.data().id] = true;
      });
      this.setState({ wishlist: items });
    });
  }

  loadCart() {
    const db = this.props.firebase.db;
    const wishlistRef = db.collection(CART);

    wishlistRef.get().then(querySnapshot => {
      const items = {};
      querySnapshot.forEach(doc => {
        items[doc.data().product.id] = true;
      });
      this.setState({ cart: items });
    });
  }

  toggleWishlistHandler(item) {
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
      .then(() => {
        this.setState((state, props) => {
          return {
            wishlist: { ...state.wishlist, [id]: !state.wishlist[id] },
            togglingWishlist: { ...state.togglingWishlist, [id]: false }
          };
        });
      })
      .catch(e =>
        this.setState((state, props) => {
          return {
            error: true,
            togglingWishlist: { ...state.togglingWishlist, [id]: false }
          };
        })
      );
  }

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
    return productsList;
  }
}

export default withFirebase(ProductsList);
