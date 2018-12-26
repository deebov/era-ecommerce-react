import React from 'react';

import logo from '../../../assets/images/logo.svg';

const Logo = props => {
  return (
    <img
      src={logo}
      alt="Supro - the new era"
      style={{ width: props.width, height: props.height }}
    />
  );
};

export default Logo;
