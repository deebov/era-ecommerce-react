import React from 'react';

import styles from './Details.module.css';
import SocialLinks from './SocialLinks/SocialLinks';
import Rating from './Rating/Rating';
import Buttons from './Buttons/Buttons';
import Meta from './Meta/Meta';
import Price from './Price/Price';

const Details = props => {
  // This object shall be replaced by the real data
  const socialData = [
    {
      url: 'https://twitter.com/deebov',
      name: 'Twitter',
      icon: 'twitter',
    },
    {
      url: 'https://facebook.com/deebov',
      name: 'Facebook',
      icon: 'facebook',
    },
    {
      url: 'https://pinterest.com/deebov',
      name: 'Pinterst',
      icon: 'pinterest',
    },
  ];

  const {
    title,
    price,
    oldPrice,
    summary,
    reviews,
    categories,
    tags,
    rating,
  } = props.item;

  return (
    <div className={styles.Details}>
      <Rating rating={rating} reviews={reviews} />
      <h1 className={styles.Title}>{title}</h1>
      <Price price={price} oldPrice={oldPrice} />
      <p className={styles.Summary}>{summary}</p>
      <Buttons />
      <Meta tags={tags} categories={categories} />
      <SocialLinks socialData={socialData} />
    </div>
  );
};

export default Details;
