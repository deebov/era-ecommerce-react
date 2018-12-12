import React from 'react';

import LinkItem from '../../UI/LinkItem/LinkItem';
import styles from './Column.module.css';

const Column = props => {
  const { title, links = [] } = props;

  return (
    <div className={styles.Column}>
      <h4 className={styles.Title}>{title}</h4>
      <div className={styles.Links}>
        {links.map(({ url, desc, title }, i) => (
          <LinkItem key={i} url={url} title={desc}>
            {title}
          </LinkItem>
        ))}
      </div>
    </div>
  );
};

export default Column;
