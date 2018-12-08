import React, { Component } from 'react';

import ProductThumb from '../../components/ProductThumb/ProductThumb';
import styles from './ProductsList.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withFirebase } from '../../components/Firebase';
import { LISTS, ALL_PRODUCTS, CART } from '../../constants/firebase';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      listID: null,
      cart: {},
      loading: false,
      addingToCart: false,
      error: false
    };

    this._isMounted = false;

    this.loadData = this.loadData.bind(this);
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.loadData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addToCartHandler(e, item) {
    e.preventDefault();

    this.setState({ addingToCart: true });

    const db = this.props.firebase.db;
    const cartRef = db.collection(CART);
    const cartDocRef = cartRef.doc(item.id);

    cartDocRef
      .set({
        amount: 1,
        product: {
          title: item.title,
          id: item.id,
          thumbnail: item.thumbnails[0],
          price: item.price
        },
        updated: false
      })
      .then(() =>
        this.setState({
          addingToCart: false,
          cart: { ...this.state.cart, [item.id]: true }
        })
      )
      .catch(e => this.setState({ error: true }));
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

    listDocRef
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
            addingToCart={this.state.addingToCart}
            addedToCart={this.state.cart.hasOwnProperty(p.id)}
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
