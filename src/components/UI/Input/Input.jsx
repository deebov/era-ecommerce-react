import React from 'react';

import styles from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [styles.Input];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.InputInvalid);
  }

  switch (props.inputType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={styles.SelectElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((e, idx) => {
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
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
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

export default Input;
