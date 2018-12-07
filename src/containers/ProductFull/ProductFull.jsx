import React, { Component } from 'react';

import ProductSummary from '../../components/ProductSummary/ProductSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withFirebase } from '../../components/Firebase';
import { ALL_PRODUCTS, CART } from '../../constants/firebase';

export const FormHandlersContext = React.createContext({});

class ProductFull extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedProduct: null,
      counter: 1,
      addingToCart: false,
      error: null,
      loading: false
    };

    this.loadData = this.loadData.bind(this);
    this.incCounterHandler = this.incCounterHandler.bind(this);
    this.decCounterHandler = this.decCounterHandler.bind(this);
    this.onCounterBlurHandler = this.onCounterBlurHandler.bind(this);
    this.onCounterChangeHandler = this.onCounterChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  incCounterHandler() {
    // Do not change the state if the counter is invalid
    if (this.state.counter >= this.state.loadedProduct.amountAvaible) {
      return;
    }
    this.setState(state => {
      return {
        counter: state.counter + 1
      };
    });
  }
  decCounterHandler() {
    // Do not change the state if the counter is invalid
    if (this.state.counter <= 1) {
      return;
    }
    this.setState(state => {
      return {
        counter: state.counter - 1
      };
    });
  }

  onCounterBlurHandler() {
    // Return back the counter value to 1 if the counter is invalid
    if (this.state.counter <= 1 || isNaN(this.state.counter)) {
      this.setState({ counter: 1 });
    }
  }

  onCounterChangeHandler(e) {
    const val = parseInt(e.target.value);
    // Empty the the counter if the val is invalid
    if (isNaN(val)) {
      this.setState({ counter: '' });
      return;
    }

    if (val < 1) {
      return;
    }

    if (val > this.state.loadedProduct.amountAvaible) {
      this.setState({ counter: this.state.loadedProduct.amountAvaible });
      return;
    }

    this.setState({ counter: val });
  }

  onSubmitHandler(e) {
    e.preventDefault();

    this.setState({ addingToCart: true });

    const ID = this.props.match.params.id;
    const db = this.props.firebase.db;
    const cartRef = db.collection(CART);
    const cartDocRef = cartRef.doc(ID);

    cartDocRef
      .set({
        amount: this.state.counter,
        product: {
          title: this.state.loadedProduct.title,
          id: this.state.loadedProduct.id,
          thumbnail: this.state.loadedProduct.thumbnails[0],
          price: this.state.loadedProduct.price
        }
      })
      .then(() => this.setState({ addingToCart: false }))
      .catch(e => this.setState({ error: true }));
  }

  loadData() {
    const ID = this.props.match.params.id;
    // Return nothing if the ID is not valid

    if (!ID) {
      // Return nothing if product is loaded or
      // the IDs is same
      if (
        this.state.loadedProduct ||
        (this.state.loadedProduct && ID === this.state.loadedProduct.id)
      ) {
        return;
      }
      return;
    }

    this.setState({ loading: true });

    const db = this.props.firebase.db;
    const productDocRef = db.collection(ALL_PRODUCTS).doc(ID);

    productDocRef.get().then(doc => {
      if (!doc.exists) {
        this.setState({ error: 'NOT FOUND', loading: false });
      }
      this.setState({ loadedProduct: doc.data(), loading: false });
    });
  }

  render() {
    let summary = <Spinner />;

    if (this.state.loadedProduct) {
      summary = (
        <div>
          <FormHandlersContext.Provider
            value={{
              incClicked: this.incCounterHandler,
              decClicked: this.decCounterHandler,
              onChange: this.onCounterChangeHandler,
              onBlur: this.onCounterBlurHandler,
              onSubmit: this.onSubmitHandler,
              count: this.state.counter,
              max: this.state.loadedProduct.amountAvaible,
              onSale: this.state.loadedProduct.onSale,
              fetching: this.state.addingToCart
            }}
          >
            <ProductSummary product={this.state.loadedProduct} />
          </FormHandlersContext.Provider>
        </div>
      );
    }
    return summary;
  }
}

export default withFirebase(ProductFull);
