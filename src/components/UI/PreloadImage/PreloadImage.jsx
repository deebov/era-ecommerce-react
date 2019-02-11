import React from 'react';
import ImageLoader from 'react-load-image';
import Spinner from '../Spinner/Spinner';

import styles from './PreloadImage.module.css';

const PreloadImage = ({ src, alt, className, loadingClass }) => {
  return (
    <ImageLoader src={src}>
      <img className={className} alt={alt} />
      <div className={[styles.Loading, loadingClass].join(' ')}>
        <span role="img" aria-label="">
          ⚠️
        </span>
      </div>
      <div className={[styles.Loading, loadingClass].join(' ')}>
        <Spinner type="small" />
      </div>
    </ImageLoader>
  );
};

export default PreloadImage;
