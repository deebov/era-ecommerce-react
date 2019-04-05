import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.min.css';

import { withFirebase } from '../Firebase/index';
import Notification from '../UI/Notification/Notification';
import Layout from '../../containers/Layout/Layout';
import Auth from '../../containers/Auth/Auth';
import * as actions from '../../store/actions/';
import Routes from '../Routes/Routes';
import LoadingBar from '../UI/LoadingBar/LoadingBar';

class App extends Component {
  state = {
    isSubscribed: false,
  };

  componentDidMount() {
    document.getElementById('initial_loader').classList.add('hidden');
    this.props.onSubscribeAuthState();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthenticated && !prevState.isSubscribed) {
      nextProps.onSubscribeWishlist();
      nextProps.onSubscribeCart();

      // Prefetch Cart and Wishlist pages after authentification
      import(/* webpackChunkName: "cart" */ '../../pages/CartPage/CartPage');
      import(/* webpackChunkName: "wishlist" */ '../../pages/WishlistPage/WishlistPage');

      return { isSubscribed: true };
    } else if (!nextProps.isAuthenticated && prevState.isSubscribed) {
      nextProps.onUnsubscribeWishlist();
      nextProps.onUnsubscribeCart();
      return { isSubscribed: false };
    }
    return null;
  }

  componentWillUnmount() {
    actions.unsubscribeAuthState();
    if (this.state.isSubscribed) {
      this.props.onUnsubscribeWishlist();
      this.props.onUnsubscribeCart();
    }
  }

  render() {
    return (
      <div>
        <Helmet
          defaultTitle="ERA by deebov"
          titleTemplate="%s | ERA by deebov"
          defer={false}
        />

        <Auth />

        <Layout>
          <Routes />
        </Layout>

        <ToastContainer />

        <LoadingBar show={this.props.showLoadingBar} />

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
    showLoadingBar: state.loadingBar.show,
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
    onRemoveNotification: () => dispatch(actions.removeNotification()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withFirebase(App))
);
