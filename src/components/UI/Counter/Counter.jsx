import React from 'react';

import styles from './Counter.module.css';
import Icon from '../Icon/Icon';

const Counter = props => {
  const {
    decClicked,
    incClicked,
    onChange,
    onBlur,
    value = 1,
    minValue = 1,
    maxValue = 300,
  } = props;
  return (
    <div className={styles.Container}>
      <span onClick={decClicked}>
        <Icon
          icon="minus-round"
          className={[styles.ControlIcon, styles.left].join(' ')}
          type="ionic"
        />
      </span>
      <input
        className={styles.Input}
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={minValue}
        max={maxValue}
        step="1"
        name="counter"
      />
      <span onClick={incClicked}>
        <Icon
          icon="plus-round"
          className={[styles.ControlIcon, styles.right].join(' ')}
          type="ionic"
        />
      </span>
    </div>
  );
};

export default Counter;
