import React, { Component } from 'react';

import ProductThumb from '../../components/ProductThumb/ProductThumb';
import styles from './ProductsList.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withFirebase } from '../../components/Firebase';
import { LISTS, ALL_PRODUCTS } from '../../constants/firebase';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      listID: null,
      loading: false,
      error: false
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
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
        this.setState({ products, listID: ID, loading: false });
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
          <ProductThumb item={p} />
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
