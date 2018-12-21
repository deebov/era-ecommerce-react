import * as actionTypes from './actionTypes';
import { addError } from './errors';

export const fetchProductStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START
  };
};

export const fetchProductFail = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL
  };
};

export const fetchProductSuccess = product => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    product
  };
};

export const fetchProduct = id => async (dispatch, getState, firestoreRefs) => {
  dispatch(fetchProductStart());

  try {
    const doc = await firestoreRefs.allProducts.doc(id).get();

    if (!doc.exists) {
      dispatch(fetchProductFail('NOT_FOUND'));
    }
    dispatch(fetchProductSuccess(doc.data()));
  } catch (error) {
    dispatch(fetchProductFail());
    dispatch(addError());
  }
};
