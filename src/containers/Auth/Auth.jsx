import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthPresentational from '../../components/Auth/Auth';
import * as actions from '../../store/actions';

const Auth = props => {
  const onSignupUserHandler = (e, registerData) => {
    e.preventDefault();

    props.onSignupUser(registerData);
  };

  const onSigninUserHandler = (e, loginData) => {
    e.preventDefault();

    props.onSigninUser(loginData);
  };

  return (
    <div>
      {props.showAuth && (
        <AuthPresentational
          onSwitchVisible={props.onSwitchShowAuth}
          signupUser={onSignupUserHandler}
          signinUser={onSigninUserHandler}
        />
      )}
    </div>
  );
};

Auth.propTypes = {
  showAuth: PropTypes.bool,
  onSwitchShowAuth: PropTypes.func,
  onSignupUser: PropTypes.func,
  onSigninUser: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    showAuth: state.auth.showAuth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSwitchShowAuth: () => dispatch(actions.switchShowAuth()),
    onSignupUser: registerData => dispatch(actions.auth(registerData)),
    onSigninUser: loginData => dispatch(actions.auth(loginData, 'login')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
