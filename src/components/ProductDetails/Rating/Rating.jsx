import React from 'react';

import styles from './Rating.module.css';
import RatingStars from '../../ProductThumb/RatingStars/RatingStars';

const Rating = ({ reviews, rating }) => {
  const reviewsLen = reviews.length;

  return (
    <div className={styles.Rating}>
      <RatingStars rating={rating} theme="yellow" />
      <span className={styles.ReviewsCount}>
        {reviewsLen} Review{reviewsLen > 1 ? 's' : ''}
      </span>
    </div>
  );
};

export default Rating;
