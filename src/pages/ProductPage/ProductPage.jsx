import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Product from '../../components/Product/Product';
import Spinner from '../../components/UI/Spinner/Spinner';
import { NOT_FOUND } from '../../constants/routes';
import * as actions from '../../store/actions/index';

export const FormHandlersContext = React.createContext({});

const ProductPage = props => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const ID = props.match.params.id;
    props.onFetchProduct(ID);
  }, [props.match.params.id]);

  const incCounterHandler = () => {
    // Do not change the state if the counter is invalid
    if (counter >= props.product.amountAvaible) {
      return;
    }

    setCounter(prevCounter => prevCounter + 1);
  };

  const decCounterHandler = () => {
    // Do not change the state if the counter is invalid
    if (counter > 1) {
      setCounter(prevCounter => prevCounter - 1);
    }
  };

  const onCounterBlurHandler = () => {
    // Return back the counter value to 1 if the counter is invalid
    if (counter < 1) {
      setCounter(1);
    }
  };

  const onCounterChangeHandler = e => {
    const val = Math.abs(+e.target.value);

    if (val > props.product.amountAvaible) {
      setCounter(props.product.amountAvaible);
      return;
    }

    setCounter(val);
  };

  const addToWishlistHandler = () => {
    const {
      id,
      title,
      price,
      thumbnails: [thumbnail],
    } = props.product;

    props.onAddToWishlist({
      id,
      title,
      price,
      thumbnail,
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const {
      product: {
        id,
        title,
        price,
        thumbnails: [thumbnail],
      },
    } = props;

    props.onAddToCart({
      amount: counter,
      id,
      product: {
        title,
        id,
        thumbnail,
        price,
      },
    });
  };

  const renderSummary = () => {
    let summary = <Spinner />;

    if (props.product) {
      const id = props.product.id;

      summary = (
        <div>
          <FormHandlersContext.Provider
            value={{
              id,
              incClicked: incCounterHandler,
              decClicked: decCounterHandler,
              onChange: onCounterChangeHandler,
              onBlur: onCounterBlurHandler,
              onSubmit: onSubmitHandler,
              count: counter,
              onSale: props.product.onSale,
              addToWishlistClicked: addToWishlistHandler,
            }}
          >
            <Product product={props.product} />
          </FormHandlersContext.Provider>
        </div>
      );
    }

    return summary;
  };

  console.log('render');
  return (
    <div>
      <Helmet>
        <title>Title</title>
      </Helmet>
      {renderSummary()}
      {props.error.message === 'NOT_FOUND' && <Redirect to={NOT_FOUND} />}
    </div>
  );
};

ProductPage.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onFetchProduct: PropTypes.func,
  onAddToWishlist: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProduct: id => dispatch(actions.fetchProduct(id)),
    onAddToCart: item => dispatch(actions.addToCart(item)),
    onAddToWishlist: item => dispatch(actions.addToWishlist(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
