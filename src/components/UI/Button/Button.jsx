import React from 'react';

import styles from './Button.module.css';

const Button = ({
  loading,
  theme = 'white',
  size = 'small',
  className,
  clicked,
  disabled,
  children,
}) => {
  const classNames = [styles.Button, styles[size], styles[theme], className];

  if (loading && !disabled) {
    classNames.push(styles.ButtonLoading);
  }

  if (disabled) {
    classNames.push(styles.ButtonDisabled);
  }

  return (
    <button
      className={classNames.join(' ')}
      onClick={clicked}
      disabled={disabled || loading}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
