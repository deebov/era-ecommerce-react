import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
  cart: {},
  isAddingToCart: {},
  isRemovingFromCart: {},
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  const { isAddingToCart, isRemovingFromCart } = state;

  switch (action.type) {
    case actionTypes.ADD_TO_CART_START:
      return updateObject(state, {
        isAddingToCart: { ...isAddingToCart, [action.id]: true }
      });

    case actionTypes.ADD_TO_CART_FAIL:
      return updateObject(state, {
        error: { _status: true },
        isAddingToCart: { ...isAddingToCart, [action.id]: false }
      });
    case actionTypes.ADD_TO_CART_SUCCESS:
      return updateObject(state, {
        isAddingToCart: { ...isAddingToCart, [action.id]: false }
      });
    case actionTypes.REMOVE_FROM_CART_START:
      return updateObject(state, {
        isRemovingFromCart: { ...isRemovingFromCart, [action.id]: true }
      });

    case actionTypes.REMOVE_FROM_CART_FAIL:
      return updateObject(state, {
        error: { _status: true },
        isRemovingFromCart: { ...isRemovingFromCart, [action.id]: false }
      });
    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      return updateObject(state, {
        isRemovingFromCart: { ...isRemovingFromCart, [action.id]: false }
      });
    case actionTypes.SUBSCRIBE_CART_START:
      return updateObject(state, { loading: true });
    case actionTypes.SUBSCRIBE_CART_FAIL:
      return updateObject(state, { error: { _status: true } });
    case actionTypes.SUBSCRIBE_CART_SUCCESS:
      return updateObject(state, { cart: action.cart, loading: false });
    default:
      return state;
  }
};

export default reducer;
