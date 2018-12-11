import React from 'react';

import Counter from '../../UI/Counter/Counter';
import Button from '../../UI/Button/Button';
import WishlistButton from '../WishlistButton/WishlistButton';
import styles from './Buttons.module.css';
import { FormHandlersContext } from '../../../containers/ProductFull/ProductFull';

const Buttons = props => {
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
          onSale,
          fetching,
          addToWishlistClicked,
          addingToWishlist,
          inWishlist
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
            <Button
              theme="big"
              clicked={onSubmit}
              disabled={!onSale}
              loading={fetching}
            >
              add to cart
            </Button>
            <WishlistButton
              clicked={addToWishlistClicked}
              saved={inWishlist}
              loading={addingToWishlist}
            />
          </div>
        )}
      </FormHandlersContext.Consumer>
    </form>
  );
};

export default Buttons;
