import React from 'react';

import styles from './Input.module.css';

const Input = ({ onChange, valid, value, touched, placeholder, name }) => {
  const classNames = [styles.Input];

  if (!valid && touched) {
    classNames.push(styles.InputInvalid);
  }

  return (
    <div className={styles.Container}>
      <input
        className={classNames.join(' ')}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default Input;
