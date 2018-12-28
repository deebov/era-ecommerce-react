import React from 'react';
import PropTypes from 'prop-types';

import styles from './Counter.module.css';
import Icon from '../Icon/Icon';

const Counter = props => {
  const { decClicked, incClicked, onChange, onBlur, value, className } = props;
  return (
    <div className={[styles.Container, className].join(' ')}>
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

Counter.propTypes = {
  decClicked: PropTypes.func,
  incClicked: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Counter.defaultProps = {
  value: 1,
};

export default Counter;
