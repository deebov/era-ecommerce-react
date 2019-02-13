import * as actionTypes from './actionTypes';
import { addError } from './errors';
import { showLoadingBar, hideLoadingBar } from './loadingBar';

export const fetchProductStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START,
  };
};

export const fetchProductFail = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
  };
};

export const fetchProductSuccess = product => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    product,
  };
};

export const fetchProduct = id => async (
  dispatch,
  getState,
  { firestoreRefs }
) => {
  if (getState().product.product && getState().product.product.id === id) {
    return;
  }
  dispatch(fetchProductStart());
  dispatch(showLoadingBar(id));
  try {
    const doc = await firestoreRefs.allProducts.doc(id).get();

    if (!doc.exists) {
      dispatch(fetchProductFail('NOT_FOUND'));
    }
    dispatch(fetchProductSuccess(doc.data()));
    dispatch(hideLoadingBar(id));
  } catch (error) {
    dispatch(fetchProductFail());
    dispatch(addError());
    dispatch(hideLoadingBar(id));
  }
};
