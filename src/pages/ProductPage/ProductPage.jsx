import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Product from '../../components/Product/Product';
import Spinner from '../../components/UI/Spinner/Spinner';
import { NOT_FOUND } from '../../constants/routes';
import * as actions from '../../store/actions/index';
import withNotification from '../../hoc/withNotification/withNotification';

export const FormHandlersContext = React.createContext({});

class ProductPage extends Component {
  state = {
    title: 'Untitled',
    counter: 1,
    error: false,
    loading: false,
  };

  componentDidMount() {
    const ID = this.props.match.params.id;
    this.props.onFetchProduct(ID);
  }

  incCounterHandler = () => {
    // Do not change the state if the counter is invalid
    if (this.state.counter >= this.props.product.amountAvaible) {
      return;
    }
    this.setState(state => {
      return {
        counter: state.counter + 1,
      };
    });
  };

  decCounterHandler = () => {
    // Do not change the state if the counter is invalid
    if (this.state.counter > 1) {
      this.setState(state => {
        return {
          counter: state.counter - 1,
        };
      });
    }
  };

  onCounterBlurHandler = () => {
    // Return back the counter value to 1 if the counter is invalid
    if (this.state.counter < 1) {
      this.setState({ counter: 1 });
    }
  };

  onCounterChangeHandler = e => {
    const val = Math.abs(+e.target.value);

    if (val > this.props.product.amountAvaible) {
      this.setState({ counter: this.props.product.amountAvaible });
      return;
    }

    this.setState({ counter: val });
  };

  addToWishlistHandler = () => {
    if (!this.props.isAuthenticated) {
      this.props.onShowAuthModal();
      this.props.notify('Please, log in to continue', { type: 'success' });
      return;
    }
    const { id, title, price, thumbnails } = this.props.product;
    const thumbnail = thumbnails[0];
    this.props.onAddToWishlist({
      id,
      title,
      price,
      thumbnail,
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (!this.props.isAuthenticated) {
      this.props.onShowAuthModal();
      this.props.notify('Please, log in to continue', { type: 'success' });
      return;
    }

    const { product } = this.props;

    this.props.onAddToCart({
      amount: this.state.counter,
      id: product.id,
      product: {
        title: product.title,
        id: product.id,
        thumbnail: product.thumbnails[0],
        price: product.price,
      },
    });
  };

  render() {
    let summary = <Spinner />;

    if (this.props.product) {
      const id = this.props.product.id;

      summary = (
        <div>
          <FormHandlersContext.Provider
            value={{
              id,
              incClicked: this.incCounterHandler,
              decClicked: this.decCounterHandler,
              onChange: this.onCounterChangeHandler,
              onBlur: this.onCounterBlurHandler,
              onSubmit: this.onSubmitHandler,
              count: this.state.counter,
              onSale: this.props.product.onSale,
              addToWishlistClicked: this.addToWishlistHandler,
            }}
          >
            <Product product={this.props.product} />
          </FormHandlersContext.Provider>
        </div>
      );
    }

    return (
      <div>
        <Helmet defer={false}>
          <title>{this.props.loading ? 'Loading...' : this.state.title}</title>
        </Helmet>
        {summary}
        {this.props.error.message === 'NOT_FOUND' ? (
          <Redirect to={NOT_FOUND} />
        ) : null}
      </div>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onFetchProduct: PropTypes.func,
  onAddToWishlist: PropTypes.func,
  onShowAuthModal: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
    isAuthenticated: state.auth.isAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProduct: id => dispatch(actions.fetchProduct(id)),
    onAddToCart: item => dispatch(actions.addToCart(item)),
    onAddToWishlist: item => dispatch(actions.addToWishlist(item)),
    onShowAuthModal: () => dispatch(actions.switchShowAuth()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNotification(ProductPage));
