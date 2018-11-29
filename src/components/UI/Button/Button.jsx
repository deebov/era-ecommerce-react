import React from 'react';

import styles from './Button.module.css';

const Button = ({ loading, theme = 'small', clicked, children }) => {
  const classNames = [styles.Button, styles[theme]];

  if (loading) {
    classNames.push(styles.ButtonLoading);
  }

  return (
    <button
      className={classNames.join(' ')}
      onClick={clicked}
      disabled={loading}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
