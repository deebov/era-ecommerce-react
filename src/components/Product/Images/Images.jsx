import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Images.module.css';
import Icon from '../../UI/Icon/Icon';

const Animated = posed.div({
  enter: {
    y: '0%',
    opacity: 1,
  },
  exit: {
    y: '100%',
    opacity: 0,
  },
});

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

NavArrow.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

function Slide(images) {
  const slides = images.map((e, i) => (
    <div className={styles.Slide} key={i}>
      <img src={e} alt={e} />
    </div>
  ));
  return slides;
}

Slide.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default class Images extends Component {
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      className: styles.Slider,
      slidesToShow: 2,
      nextArrow: <NavArrow type="next" />,
      prevArrow: <NavArrow type="back" />,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <Animated className={styles.Container}>
        <Slider {...settings}>{Slide(this.props.images)}</Slider>
      </Animated>
    );
  }
}

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};
