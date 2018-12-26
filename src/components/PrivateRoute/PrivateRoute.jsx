import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../UI/Spinner/Spinner';

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuthenticated,
  isAuthPending,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthPending ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo || '/'} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isAuthPending: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuth,
    isAuthPending: state.auth.isPending,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
