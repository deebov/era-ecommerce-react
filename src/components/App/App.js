import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.min.css';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase/index';
import lazyComponent from '../../hoc/lazyComponent/lazyComponent';
import Layout from '../../containers/Layout/Layout';
import Auth from '../../containers/Auth/Auth';
import * as actions from '../../store/actions/';

import LandingPage from '../../pages/LandingPage/LandingPage';
import Notification from '../UI/Notification/Notification';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

// Import lazyloading components
const LazyProductPage = lazyComponent(() => {
  return import('../../pages/ProductPage/ProductPage');
});
const LazyWishlistPage = lazyComponent(() => {
  return import('../../pages/WishlistPage/WishlistPage');
});
const LazyCartPage = lazyComponent(() => {
  return import('../../pages/CartPage/CartPage');
});
const LazyNotFoundPage = lazyComponent(() => {
  return import('../../pages/NotFoundPage/NotFoundPage');
});

/**
 * TODO
 * react-helmet doesn't render the title in the
 * new tab till you switch to it. this is a bug
 * from react-helmet. if they don't fix the bug
 * switch to the react-document-title from Dan Abramov
 */

class App extends Component {
  state = {
    isSubscribed: false,
  };

  componentDidMount() {
    this.props.onSubscribeAuthState();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthenticated && !prevState.isSubscribed) {
      nextProps.onSubscribeWishlist();
      nextProps.onSubscribeCart();
      return { isSubscribed: true };
    } else if (!nextProps.isAuthenticated && prevState.isSubscribed) {
      nextProps.onUnsubscribeWishlist();
      nextProps.onUnsubscribeCart();
      return { isSubscribed: false };
    }
    return null;
  }

  componentWillUnmount() {
    this.props.onUnsubscribeAuthState();
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
            <Route path={`${ROUTES.ITEM}/:id`} component={LazyProductPage} />
            <PrivateRoute path={ROUTES.CART} component={LazyCartPage} />
            <PrivateRoute path={ROUTES.WISHLIST} component={LazyWishlistPage} />
            <Route component={LazyNotFoundPage} />
          </Switch>
        </Layout>
        <ToastContainer />
        <Notification
          text={this.props.errorText}
          show={this.props.error}
          onOpen={this.props.onRemoveError}
          options={{ type: 'fail' }}
        />
        <Notification
          text={this.props.notificationText}
          show={this.props.notification}
          onOpen={this.props.onRemoveNotification}
          options={{ type: 'success' }}
        />
      </div>
    );
  }
}

App.propTypes = {
  error: PropTypes.bool,
  errorText: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  notification: PropTypes.bool,
  notificationText: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    error: state.errors.error,
    errorText: state.errors.text,
    notification: state.notifications.notification,
    notificationText: state.notifications.text,
    isAuthenticated: state.auth.isAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubscribeWishlist: () => dispatch(actions.subscribeWishlist()),
    onUnsubscribeWishlist: () => dispatch(actions.unsubscribeWishlist()),
    onSubscribeCart: () => dispatch(actions.subscribeCart()),
    onUnsubscribeCart: () => dispatch(actions.unsubscribeCart()),
    onRemoveError: () => dispatch(actions.removeError()),
    onSubscribeAuthState: () => dispatch(actions.subscribeAuthState()),
    onUnsubscribeAuthState: () => dispatch(actions.unsubscribeAuthState()),
    onRemoveNotification: () => dispatch(actions.removeNotification()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withFirebase(App))
);
