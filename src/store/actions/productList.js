import * as actionTypes from './actionTypes';
import { addError } from './errors';

export const fetchListStart = listID => {
  return {
    type: actionTypes.FETCH_LIST_START,
    listID
  };
};

export const fetchListFail = (error, listID) => {
  return {
    type: actionTypes.FETCH_LIST_FAIL,
    listID
  };
};

export const fetchListSuccess = (products, listID) => {
  return {
    type: actionTypes.FETCH_LIST_SUCCESS,
    products,
    listID
  };
};

export const fetchList = id => async (dispatch, getState, firestoreRefs) => {
  dispatch(fetchListStart(id));

  try {
    const list = await firestoreRefs.lists.doc(id).get();

    if (!list.exists) {
      throw new Error('LIST_NOT_FOUND');
    }

    const IDs = Object.keys(list.data());

    const promises = IDs.map(id => {
      return firestoreRefs.allProducts.doc(id).get();
    });

    const docs = await Promise.all(promises);

    const products = docs.map(p => p.data());

    dispatch(fetchListSuccess(products, id));
  } catch (error) {
    dispatch(fetchListFail(id));
    dispatch(addError());
  }
};
