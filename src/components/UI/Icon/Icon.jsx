import React from 'react';

import './ionicons.min.css';
import './linearicons.min.css';

const Icon = props => {
  const { icon, className, color = '', type = 'linear' } = props;
  let { fontSize } = props;
  fontSize = fontSize ? fontSize + 'px' : '14px';

  // Icons can be in different types. User can choose the type
  const prefix =
    type === 'linear' ? 'lnr lnr-' : type === 'ionic' ? 'ion-' : '';

  const classNames = [prefix + icon, className].join(' ');
  return <i className={classNames} style={{ fontSize, color }} />;
};

export default Icon;
