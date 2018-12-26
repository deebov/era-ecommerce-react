import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Images.module.css';
import Icon from '../../UI/Icon/Icon';

/**
 * TODO
 * improve ALTs
 */

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
      <Icon icon={`ios-arrow-${iconName}`} type="ionic" />
    </span>
  );
}

function Slide(images) {
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
      nextArrow: <NavArrow type="next" />,
      prevArrow: <NavArrow type="back" />,
    };
    return (
      <div className={styles.Container}>
        <Slider {...settings}>{Slide(this.props.images)}</Slider>
      </div>
    );
  }
}
