import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Meta.module.css';

const Meta = ({ tags, categories }) => {
  const categoryLinks = metaLinkGenerator(categories, '/category/');
  const tagLinks = metaLinkGenerator(tags, '/tags/');

  return (
    <div className={styles.MetaContainer}>
      <div className={styles.MetaInner}>
        <strong className={styles.MetaTitle}>Categories: </strong>
        {categoryLinks}
      </div>
      <div className={styles.MetaInner}>
        <strong className={styles.MetaTitle}>Tags: </strong>
        {tagLinks}
      </div>
    </div>
  );
};

Meta.propTypes = {
  tags: PropTypes.array,
  categories: PropTypes.array,
};

export default Meta;

// This functions generates meta link elements
export const metaLinkGenerator = (obj, path) => {
  const array = Object.keys(obj);
  return array.map((e, i, arr) => {
    e = obj[e];
    return (
      <Link
        to={`${path}${e.id}`}
        title={e.title}
        key={e.id}
        className={styles.MetaLink}
      >
        {e.title}
        {++i < arr.length ? ', ' : ''}
      </Link>
    );
  });
};
