import React, { Component } from 'react';
import uniqid from 'uniqid';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Product from '../../components/Product/Product';
import styles from './ProductsList.module.css';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: uniqid(),
          title: 'Black Woman Jacket',
          desc: 'New Jacket',
          image:
            'http://demo3.drfuri.com/supro/wp-content/uploads/sites/3/2018/05/6b-400x400.jpg',
          rating: 3,
          price: 55.99,
          oldPrice: 100,
          ribbonType: 'sale'
        },
        {
          id: uniqid(),
          title: 'Black Woman Jacket',
          desc: 'New Jacket',
          image:
            'http://demo3.drfuri.com/supro/wp-content/uploads/sites/3/2018/05/6b-400x400.jpg',
          rating: 3,
          price: 55.99,
          oldPrice: 100,
          ribbonType: 'sale'
        },
        {
          id: uniqid(),
          title: 'Black Woman Jacket',
          desc: 'New Jacket',
          image:
            'http://demo3.drfuri.com/supro/wp-content/uploads/sites/3/2018/05/6b-400x400.jpg',
          rating: 3,
          price: 55.99,
          oldPrice: 100,
          ribbonType: 'sale'
        },
        {
          id: uniqid(),
          title: 'Black Woman Jacket',
          desc: 'New Jacket',
          image:
            'http://demo3.drfuri.com/supro/wp-content/uploads/sites/3/2018/05/6b-400x400.jpg',
          rating: 3,
          price: 55.99,
          oldPrice: 100,
          ribbonType: 'sale'
        },
        {
          id: uniqid(),
          title: 'Black Woman Jacket Woman Jacket Woman Jacket',
          desc: 'New Jacket',
          image:
            'http://demo3.drfuri.com/supro/wp-content/uploads/sites/3/2018/05/6b-400x400.jpg',
          rating: 3,
          price: 55.99,
          oldPrice: 100,
          ribbonType: 'hot'
        },
        {
          id: uniqid(),
          title: 'Black Woman Jacket',
          desc: 'New Jacket',
          image:
            'http://demo3.drfuri.com/supro/wp-content/uploads/sites/3/2018/05/6b-400x400.jpg',
          rating: 3,
          price: 55.99,
          oldPrice: 100,
          ribbonType: 'hot'
        }
      ],
      loading: false,
      error: false
    };
  }

  render() {
    const products = this.state.products.map(p => (
      <div className={styles.Column} key={p.id}>
        <Product item={p} />
      </div>
    ));
    return (
      <section className={styles.Grid}>
        <div className={styles.Row}>{products}</div>
      </section>
    );
  }
}

export default ProductsList;
