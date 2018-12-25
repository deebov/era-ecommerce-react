import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthPresentational from '../../components/Auth/Auth';
import * as actions from '../../store/actions';

class Auth extends Component {
  onSignupUserHandler = (e, registerData) => {
    e.preventDefault();

    this.props.onSignupUser(registerData);
  };

  onSigninUserHandler = (e, loginData) => {
    e.preventDefault();

    this.props.onSigninUser(loginData);
  };

  render() {
    return (
      <div>
        {this.props.showAuth && (
          <AuthPresentational
            onSwitchVisible={this.props.onSwitchShowAuth}
            signupUser={this.onSignupUserHandler}
            signinUser={this.onSigninUserHandler}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAuth: state.auth.showAuth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSwitchShowAuth: () => dispatch(actions.switchShowAuth()),
    onSignupUser: registerData => dispatch(actions.auth(registerData)),
    onSigninUser: loginData => dispatch(actions.auth(loginData, 'login'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
