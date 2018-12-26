import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const {
    elementConfig,
    value,
    changed,
    touched,
    invalid,
    shouldValidate,
  } = props;
  const inputClasses = [styles.Input];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(styles.InputInvalid);
  }

  switch (props.inputType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={styles.SelectElement}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map((e, idx) => {
            return (
              <option key={idx} value={e.value}>
                {e.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
  }

  return (
    <div className={styles.Container}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  elementConfig: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changed: PropTypes.func,
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
};

export default Input;
