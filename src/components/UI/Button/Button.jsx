import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({
  loading,
  theme,
  size,
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

Button.propTypes = {
  loading: PropTypes.bool,
  theme: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  theme: 'white',
  size: 'small',
};

export default Button;
