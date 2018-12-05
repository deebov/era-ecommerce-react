import React from 'react';

import Counter from '../../UI/Counter/Counter';
import Button from '../../UI/Button/Button';
import AddToWishList from '../../AddToWishList/AddToWishList';
import styles from './Buttons.module.css';
import { FormHandlersContext } from '../../../containers/ProductFull/ProductFull';

const Buttons = ({
  addedToCart,
  addedToWishlist,
  increasedCounter,
  decreasedCounter
}) => {
  return (
    <form action="">
      <FormHandlersContext.Consumer>
        {({
          incClicked,
          decClicked,
          onChange,
          onBlur,
          onSubmit,
          count,
          max,
          onSale
        }) => (
          <div className={styles.Buttons}>
            <Counter
              incClicked={incClicked}
              decClicked={decClicked}
              onChange={onChange}
              onBlur={onBlur}
              value={count}
              max={max}
            />
            <Button theme="big" clicked={onSubmit} disabled={!onSale}>
              add to cart
            </Button>
            <AddToWishList clicked={addedToWishlist} />
          </div>
        )}
      </FormHandlersContext.Consumer>
    </form>
  );
};

export default Buttons;
