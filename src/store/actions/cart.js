import * as actionTypes from './actionTypes';
import { addError } from './errors';

let unsubscribeListener = null;

export const addToCartStart = id => {
  return {
    type: actionTypes.ADD_TO_CART_START,
    id
  };
};

export const addToCartFail = (error, id) => {
  return {
    type: actionTypes.ADD_TO_CART_FAIL,
    id
  };
};

export const addToCartSuccess = id => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    id
  };
};

export const addToCart = item => async (
  dispatch,
  getState,
  { firestoreRefs }
) => {
  const id = item.product.id;
  dispatch(addToCartStart(id));
  try {
    await firestoreRefs.cart.doc(id).set({ ...item, updated: false });

    dispatch(addToCartSuccess(id));
  } catch (error) {
    dispatch(addToCartFail(id));
    dispatch(addError());
  }
};

export const removeFromCartStart = id => {
  return {
    type: actionTypes.REMOVE_FROM_CART_START,
    id
  };
};

export const removeFromCartFail = (error, id) => {
  return {
    type: actionTypes.REMOVE_FROM_CART_FAIL,
    id
  };
};

export const removeFromCartSuccess = id => {
  return {
    type: actionTypes.REMOVE_FROM_CART_SUCCESS,
    id
  };
};

export const removeFromCart = id => async (
  dispatch,
  getState,
  firestoreRefs
) => {
  dispatch(removeFromCartStart(id));
  try {
    await firestoreRefs.cart.doc(id).delete();

    dispatch(removeFromCartSuccess(id));
  } catch (error) {
    dispatch(removeFromCartFail(id));
    dispatch(addError());
  }
};

export const subscribeCartStart = () => {
  return {
    type: actionTypes.SUBSCRIBE_CART_START
  };
};

export const subscribeCartFail = error => {
  return {
    type: actionTypes.SUBSCRIBE_CART_FAIL
  };
};

export const subscribeCartSuccess = cart => {
  return {
    type: actionTypes.SUBSCRIBE_CART_SUCCESS,
    cart
  };
};

export const subscribeCart = () => (dispatch, getState, { firestoreRefs }) => {
  dispatch(subscribeCartStart());

  if (unsubscribeListener) {
    unsubscribeListener();
  }

  try {
    unsubscribeListener = firestoreRefs.cart.onSnapshot(querySnapshot => {
      const cart = {};
      querySnapshot.forEach(doc => (cart[doc.data().product.id] = doc.data()));

      dispatch(subscribeCartSuccess(cart));
    });
  } catch (error) {
    dispatch(subscribeCartFail());
    dispatch(addError());
  }
};

export const unsubscribeCart = () => {
  if (unsubscribeListener) {
    unsubscribeListener();
  }
  return {
    type: actionTypes.UNSUBSCRIBE_CART
  };
};
