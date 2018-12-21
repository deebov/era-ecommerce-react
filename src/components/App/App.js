import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

import 'react-toastify/dist/ReactToastify.min.css';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase/index';
import Layout from '../../containers/Layout/Layout';
import Auth from '../../containers/Auth/Auth';
import * as actions from '../../store/actions/';

// Import Pages
import LandingPage from '../../pages/LandingPage/LandingPage';
import CartPage from '../../pages/CartPage/CartPage';
import WishlistPage from '../../pages/WishlistPage/WishlistPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Notification from '../UI/Notification/Notification';

/**
 * TODO
 * react-helmet doesn't render the title in the
 * new tab till you switch to it. this is a bug
 * from react-helmet. if they don't fix the bug
 * switch to the react-document-title from Dan Abramov
 */

class App extends Component {
  componentDidMount() {
    this.props.onSubscribeWishlist();
    this.props.onSubscribeCart();
  }

  componentWillUnmount() {
    this.props.onUnsubscribeWishlist();
    this.props.onUnsubscribeCart();
  }

  render() {
    return (
      <div>
        <Helmet
          defaultTitle="ERA by deebov"
          titleTemplate="%s | ERA by deebov"
        />
      <Auth />
        <Layout>
          <Switch>
            <Route path={ROUTES.LANDING} exact component={LandingPage} />
            <Route path={`${ROUTES.ITEM}/:id`} component={ProductPage} />
            <Route path={ROUTES.CART} component={CartPage} />
            <Route path={ROUTES.WISHLIST} component={WishlistPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
        <ToastContainer />
        <Notification
          show={this.props.error}
          onOpen={this.props.onRemoveError}
          options={{ type: 'fail' }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.errors.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubscribeWishlist: () => dispatch(actions.subscribeWishlist()),
    onUnsubscribeWishlist: () => dispatch(actions.unsubscribeWishlist()),
    onSubscribeCart: () => dispatch(actions.subscribeCart()),
    onUnsubscribeCart: () => dispatch(actions.unsubscribeCart()),
    onRemoveError: () => dispatch(actions.removeError())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withFirebase(App))
);
