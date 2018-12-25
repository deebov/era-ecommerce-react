import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo || '/'} />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuth
  };
};

export default connect(mapStateToProps)(PrivateRoute);
