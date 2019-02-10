import * as actionTypes from './actionTypes';
import { addError } from './errors';
import { addNotification } from './notifications';

let unsubscribeListener = null;

export const addToCartStart = id => {
  return {
    type: actionTypes.ADD_TO_CART_START,
    id,
  };
};

export const addToCartFail = (error, id) => {
  return {
    type: actionTypes.ADD_TO_CART_FAIL,
    id,
  };
};

export const addToCartSuccess = id => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    id,
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
    const uid = getState().auth.uid;
    await firestoreRefs.cart
      .doc(uid)
      .collection('items')
      .doc(id)
      .set({ ...item, updated: false });

    dispatch(addToCartSuccess(id));
    dispatch(addNotification('Product was added 🛒!'));
  } catch (error) {
    dispatch(addToCartFail(id));
    dispatch(addError());
  }
};

export const removeFromCartStart = id => {
  return {
    type: actionTypes.REMOVE_FROM_CART_START,
    id,
  };
};

export const removeFromCartFail = id => {
  return {
    type: actionTypes.REMOVE_FROM_CART_FAIL,
    id,
  };
};

export const removeFromCartSuccess = id => {
  return {
    type: actionTypes.REMOVE_FROM_CART_SUCCESS,
    id,
  };
};

export const removeFromCart = id => async (
  dispatch,
  getState,
  { firestoreRefs }
) => {
  dispatch(removeFromCartStart(id));
  try {
    const uid = getState().auth.uid;
    await firestoreRefs.cart
      .doc(uid)
      .collection('items')
      .doc(id)
      .delete();

    dispatch(removeFromCartSuccess(id));
    dispatch(addNotification('Product was removed 🛒!'));
  } catch (error) {
    dispatch(removeFromCartFail(id));
    dispatch(addError());
  }
};

export const subscribeCartStart = () => {
  return {
    type: actionTypes.SUBSCRIBE_CART_START,
  };
};

export const subscribeCartFail = () => {
  return {
    type: actionTypes.SUBSCRIBE_CART_FAIL,
  };
};

export const subscribeCartSuccess = cart => {
  return {
    type: actionTypes.SUBSCRIBE_CART_SUCCESS,
    cart,
  };
};

export const subscribeCart = () => (dispatch, getState, { firestoreRefs }) => {
  dispatch(subscribeCartStart());
console.log('halloo');

  if (unsubscribeListener) {
    unsubscribeListener();
  }

  try {
    const uid = getState().auth.uid;
    unsubscribeListener = firestoreRefs.cart
      .doc(uid)
      .collection('items')
      .onSnapshot(querySnapshot => {
        const cart = {};
        querySnapshot.forEach(doc => {
          cart[doc.data().id] = doc.data();
        });

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
    type: actionTypes.UNSUBSCRIBE_CART,
  };
};
