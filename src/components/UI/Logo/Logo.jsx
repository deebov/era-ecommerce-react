import React from 'react';
import PropTypes from 'prop-types';

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

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Logo;
