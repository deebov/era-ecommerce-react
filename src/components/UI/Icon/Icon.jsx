import React from 'react';

import style from './Icon.module.css'

const Icon = props => {
  const {iconClassNames} = props

  return (
    <div className={style.icon} >
      <span className={iconClassNames}></span>
    </div>
  );
};

export default Icon;