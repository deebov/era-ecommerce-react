import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styles from './Auth.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const AuthPresentational = () => {
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

          <TabPanel>
            <div>
              <form className={styles.Form}>
                <div className={styles.FormElements}>
                  <Input placeholder="Username" />
                </div>
                <div className={styles.FormElements}>
                  <Input placeholder="Password" />
                </div>
                <Button size='big' theme=''>login</Button>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <form className={styles.Form}>
                <div className={styles.FormElements}>
                  <Input placeholder="Username" />
                </div>
                <div className={styles.FormElements}>
                  <Input placeholder="Email address" />
                </div>
                <div className={styles.FormElements}>
                  <Input placeholder="Password" />
                </div>
                <Button size='big' theme=''>register</Button>
              </form>
            </div>

          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPresentational;
