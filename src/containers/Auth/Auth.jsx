import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthPresentational from '../../components/Auth/Auth';
import * as actions from '../../store/actions';

class Auth extends Component {
  render() {
    return (
      <div>
        <AuthPresentational
          visible={this.props.showAuth}
          onSwitchVisible={this.props.onSwitchShowAuth}
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
    onSwitchShowAuth: () => dispatch(actions.switchShowAuth())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
