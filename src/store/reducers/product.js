import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
  product: null,
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_PRODUCT_FAIL:
      return updateObject(state, {
        error: { _status: true },
        loading: false
      });
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return updateObject(state, { product: action.product, loading: false });
    default:
      return state;
  }
};

export default reducer;
