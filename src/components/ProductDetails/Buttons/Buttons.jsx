import React from 'react';

import Counter from '../../UI/Counter/Counter';
import Button from '../../UI/Button/Button';
import AddToWishList from '../../AddToWishList/AddToWishList';
import styles from './Buttons.module.css';

const Buttons = ({
  addedToCart,
  addedToWishlist,
  increasedCounter,
  decreasedCounter
}) => {
  return (
    <form action="">
      <div className={styles.Buttons}>
        <Counter incClicked={increasedCounter} decClicked={decreasedCounter} />
        <Button theme="big" clicked={addedToCart}>
          add to cart
        </Button>
        <AddToWishList clicked={addedToWishlist} />
      </div>
    </form>
  );
};

export default Buttons;
