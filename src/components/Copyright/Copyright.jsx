import React from 'react';

import Logo from '../UI/Logo/Logo';
import styles from './Copyright.module.css';
import LinkItem from '../UI/LinkItem/LinkItem';
import { getClassName } from '../../components/UI/ResponsiveWrapper/ResponsiveWrapper';

/**
 * TODO
 * Add social network icons
 */

export const Copyright = () => {
  return (
    <div className={styles.Copyright}>
      <div className={styles.Container + ` ${getClassName()}`}>
        <div className={styles.InnerContainer}>
          &copy; 2018
          <div className={styles.Logo}>
            <Logo height="15px" />
          </div>
          All rights reserved.
        </div>
        <div className={[styles.InnerContainer, styles.Links].join(' ')}>
          <LinkItem url="/" alt="Privacy Policy">
            Privacy Policy
          </LinkItem>
          <LinkItem url="/" alt="Terms of Use">
            Terms of Use
          </LinkItem>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
