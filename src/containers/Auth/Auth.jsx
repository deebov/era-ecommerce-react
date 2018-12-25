import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthPresentational from '../../components/Auth/Auth';
import * as actions from '../../store/actions';

class Auth extends Component {
  onSignupUserHandler = (e, email, password) => {
    e.preventDefault();

    this.props.onSignupUser(email, password);
  };
  onSigninUserHandler = (e, email, password) => {
    e.preventDefault();

    this.props.onSigninUser(email, password);
  };
  render() {
    return (
      <div>
        <AuthPresentational
          visible={this.props.showAuth}
          onSwitchVisible={this.props.onSwitchShowAuth}
          signupUser={this.onSignupUserHandler}
          signinUser={this.onSigninUserHandler}
        />
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
    onSignupUser: (email, password) => dispatch(actions.auth(email, password)),
    onSigninUser: (email, password) =>
      dispatch(actions.auth(email, password, 'login'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
