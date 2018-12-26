import React from 'react';
import PropTypes from 'prop-types';

import styles from './Rating.module.css';
import RatingStars from '../../../ProductThumb/RatingStars/RatingStars';

const Rating = ({ rating }) => {
  // const reviewsLen = reviews.length;

  return (
    <div className={styles.Rating}>
      <RatingStars rating={rating} theme="yellow" />
      <span className={styles.ReviewsCount}>
        {/* {reviewsLen} Review{reviewsLen > 1 ? 's' : ''} */}
      </span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
