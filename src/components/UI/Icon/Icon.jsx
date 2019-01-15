import React from 'react';
import PropTypes from 'prop-types';

import './ionicons.min.css';
import './linearicons.min.css';

export const Icon = props => {
  const { icon, className, color, type } = props;
  let { fontSize } = props;
  fontSize = fontSize ? fontSize + 'px' : '14px';

  // Icons can be in different types. User can choose the type
  const prefix =
    type === 'linear' ? 'lnr lnr-' : type === 'ionic' ? 'ion-' : '';

  const classNames = [prefix + icon, className].join(' ');
  return <i className={classNames} style={{ fontSize, color }} />;
};

Icon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
};

Icon.defaultProps = {
  color: '',
  type: 'linear',
};

export default Icon;
