import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

import styles from './Auth.module.css';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';

class AuthPresentational extends Component {
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.ContainerInner}>
          <Tabs>
            <TabList className={styles.TabList}>
              <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
                Login
              </Tab>
              <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
                Register
              </Tab>
            </TabList>

            {/* LOGIN */}
            <TabPanel>
              <SignInForm signInClicked={this.props.signinUser} />
            </TabPanel>

            {/* REGISTER */}
            <TabPanel>
              <SignUpForm signUpClicked={this.props.signupUser} />
            </TabPanel>
          </Tabs>

          <p className={styles.Close} onClick={this.props.onSwitchVisible}>
            Close
          </p>
        </div>
      </div>
    );
  }
}

AuthPresentational.propTypes = {
  onSwitchVisible: PropTypes.func,
  signinUser: PropTypes.func,
  signupUser: PropTypes.func,
};

export default AuthPresentational;
