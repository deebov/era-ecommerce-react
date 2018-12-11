import React, { Component } from 'react';

import ProductSummary from '../../components/ProductSummary/ProductSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withFirebase } from '../../components/Firebase';
import { ALL_PRODUCTS, CART, WISHLIST } from '../../constants/firebase';

export const FormHandlersContext = React.createContext({});

class ProductFull extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedProduct: null,
      counter: 1,
      addingToCart: false,
      inWishlist: false,
      addingToWishlist: false,
      error: null,
      loading: false
    };
    this._wishlistStatus = 'unfetched';

    this.loadData = this.loadData.bind(this);
    this.addToWishlistHandler = this.addToWishlistHandler.bind(this);
    this.incCounterHandler = this.incCounterHandler.bind(this);
    this.decCounterHandler = this.decCounterHandler.bind(this);
    this.onCounterBlurHandler = this.onCounterBlurHandler.bind(this);
    this.onCounterChangeHandler = this.onCounterChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  async componentDidMount() {
    await this.loadData();
    this.listenWishlist();
  }

  componentWillUnmount() {
    this.unsubcribeListener();
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
    if (this.state.counter > 1) {
      this.setState(state => {
        return {
          counter: state.counter - 1
        };
      });
    }
  }

  onCounterBlurHandler() {
    // Return back the counter value to 1 if the counter is invalid
    if (this.state.counter < 1) {
      this.setState({ counter: 1 });
    }
  }

  onCounterChangeHandler(e) {
    const val = Math.abs(+e.target.value);

    if (val > this.state.loadedProduct.amountAvaible) {
      this.setState({ counter: this.state.loadedProduct.amountAvaible });
      return;
    }

    this.setState({ counter: val });
  }

  addToWishlistHandler() {
    // Stop executing if the wishlist is not loaded from the database
    if (this._wishlistStatus === 'unfetched') {
      return;
    }

    const { id, title, price, thumbnails } = this.state.loadedProduct;
    const thumbnail = thumbnails[0];

    const db = this.props.firebase.db;
    const wishlistRef = db.collection(WISHLIST);
    const wishlistDocRef = wishlistRef.doc(id);

    // Set this true in order to components can show the Spinner
    this.setState({
      addingToWishlist: true
    });

    wishlistDocRef
      .set({
        id,
        title,
        price,
        thumbnail
      })
      .then(() => this.setState({ inWishlist: true, addingToWishlist: false }))
      .catch(e => this.setState({ error: true, addingToWishlist: false }));
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
        },
        updated: false
      })
      .then(() => this.setState({ addingToCart: false }))
      .catch(e => this.setState({ error: true }));
  }

  listenWishlist() {
    const ID = this.props.match.params.id;
    const db = this.props.firebase.db;
    const wishlistDocRef = db.collection(WISHLIST).doc(ID);

    this.unsubcribeListener = wishlistDocRef.onSnapshot(querySnapshot => {
      this.setState({ inWishlist: querySnapshot.exists });
      this._wishlistStatus = 'fetched';
    });
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

    return productDocRef.get().then(doc => {
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
              fetching: this.state.addingToCart,
              addToWishlistClicked: this.addToWishlistHandler,
              inWishlist: this.state.inWishlist,
              addingToWishlist: this.state.addingToWishlist
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
