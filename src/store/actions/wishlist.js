import * as actionTypes from './actionTypes';
import { addError } from './errors';

let unsubscribeListener = null;

/* ADD TO WISHLIST [START] */

export const addToWishlistStart = id => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST_START,
    id
  };
};

export const addToWishlistFail = id => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST_FAIL,
    id
  };
};

export const addToWishlistSuccess = id => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST_SUCCESS,
    id
  };
};

export const addToWishlist = item => async (
  dispatch,
  getState,
  { firestoreRefs }
) => {
  const id = item.id;
  dispatch(addToWishlistStart(id));
  try {
    await firestoreRefs.wishlist.doc(id).set(item);

    dispatch(addToWishlistSuccess(id));
  } catch (error) {
    dispatch(addToWishlistFail(id));
    dispatch(addError());
  }
};

/* ADD TO WISHLIST [END] */

/* REMOVE FROM WISHLIST [START] */

export const removeFromWishlistStart = id => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST_START,
    id
  };
};

export const removeFromWishlistFail = (error, id) => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST_FAIL,
    id
  };
};

export const removeFromWishlistSuccess = id => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST_SUCCESS,
    id
  };
};

export const removeFromWishlist = id => async (
  dispatch,
  getState,
  { firestoreRefs }
) => {
  dispatch(removeFromWishlistStart(id));
  try {
    await firestoreRefs.wishlist.doc(id).delete();

    dispatch(removeFromWishlistSuccess(id));
  } catch (error) {
    dispatch(removeFromWishlistFail(id));
    dispatch(addError());
  }
};

/* REMOVE FROM WISHLIST [END] */

/* SUBSCRIBE WISHLIST [START] */

export const subscribeWishlistStart = () => {
  return {
    type: actionTypes.SUBSCRIBE_WISHLIST_START
  };
};

export const subscribeWishlistFail = error => {
  return {
    type: actionTypes.SUBSCRIBE_WISHLIST_FAIL
  };
};

export const subscribeWishlistSuccess = (wishlist, unsubscribe) => {
  return {
    type: actionTypes.SUBSCRIBE_WISHLIST_SUCCESS,
    wishlist
  };
};

export const subscribeWishlist = () => (
  dispatch,
  getState,
  { firestoreRefs }
) => {
  dispatch(subscribeWishlistStart());

  if (unsubscribeListener) {
    unsubscribeListener();
  }

  try {
    unsubscribeListener = firestoreRefs.wishlist.onSnapshot(querySnapshot => {
      const wishlist = {};
      querySnapshot.forEach(doc => (wishlist[doc.data().id] = doc.data()));

      dispatch(subscribeWishlistSuccess(wishlist));
    });
  } catch (error) {
    dispatch(subscribeWishlistFail());
    dispatch(addError());
  }
};

/* SUBSCRIBE WISHLIST [END] */

/* UNSUBSCRIBE WISHLIST [START] */

export const unsubscribeWishlist = () => {
  if (unsubscribeListener) {
    unsubscribeListener();
  }
  return {
    type: actionTypes.UNSUBSCRIBE_WISHLIST
  };
};

/* UNSUBSCRIBE WISHLIST [END] */
