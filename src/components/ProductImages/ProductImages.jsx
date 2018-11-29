import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './ProductImages.module.css';
import Icon from '../UI/Icon/Icon';

import img1 from '../../assets/images/3c-1-600x600.jpg';
import img2 from '../../assets/images/3b-1.jpg';
import img3 from '../../assets/images/3a-1.jpg';


// This function generates navigation arrow depending on the arrow type
function NavArrow(props) {
  const { onClick, type } = props;
  const classNames = [styles.Arrow];
  let iconName = '';

  if (type === 'next') {
    classNames.push(styles.ArrowNext);
    iconName = 'forward';
  } else if (type === 'back') {
    classNames.push(styles.ArrowPrev);
    iconName = 'back';
  }

  return (
    <span onClick={onClick} className={classNames.join(' ')}>
      <Icon
        icon={`ios-arrow-${iconName}`}
        type="ionic"
      />
    </span>
  );
}

function Slide({ images }) {
  const slides = images.map((e, i) => (
    <div className={styles.Slide} key={i}>
      <img src={e} alt="s" />
    </div>
  ));
  return slides;
}

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      className: styles.Slider,
      slidesToShow: 2,
      nextArrow: <NavArrow type="back" />,
      prevArrow: <NavArrow type="next" />
    };
    return (
      <div className={styles.Container}>
        <Slider {...settings}>{Slide({ images: [img1, img2, img3] })}</Slider>
      </div>
    );
  }
}
