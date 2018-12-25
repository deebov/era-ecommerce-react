import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styles from './Auth.module.css';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';

const AuthPresentational = props => {
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
            <SignInForm signInClicked={props.signinUser} />
          </TabPanel>

          {/* REGISTER */}
          <TabPanel>
            <SignUpForm signUpClicked={props.signupUser} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPresentational;
