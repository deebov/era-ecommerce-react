import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SocialLinks.module.css';
import Icon from '../../UI/Icon/Icon';

const SocialLinks = ({ socialData }) => {
  // Generate social network icons inside the Link component
  const socialIcons = socialData.map((e, i) => (
    <Link to={e.url} title={e.name} key={i}>
      <Icon
        icon={`social-${e.icon}`}
        className={styles.SocialIcon}
        type="ionic"
      />
    </Link>
  ));

  return <div className={styles.SocialIconsBox}>{socialIcons}</div>;
};

export default SocialLinks;
