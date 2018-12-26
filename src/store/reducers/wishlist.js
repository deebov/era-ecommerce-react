import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
  wishlist: {},
  isAddingToWishlist: {},
  isRemovingFromWishlist: {},
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  const { isAddingToWishlist } = state;

  switch (action.type) {
    case actionTypes.ADD_TO_WISHLIST_START:
      return updateObject(state, {
        isAddingToWishlist: { ...isAddingToWishlist, [action.id]: true },
      });

    case actionTypes.ADD_TO_WISHLIST_FAIL:
      return updateObject(state, {
        error: { _status: true },
        isAddingToWishlist: { ...isAddingToWishlist, [action.id]: false },
      });
    case actionTypes.ADD_TO_WISHLIST_SUCCESS:
      return updateObject(state, {
        isAddingToWishlist: { ...isAddingToWishlist, [action.id]: false },
      });

    case actionTypes.REMOVE_FROM_WISHLIST_START:
      return updateObject(state, {
        isRemovingFromWishlist: {
          ...state.isRemovingFromWishlist,
          [action.id]: true,
        },
      });

    case actionTypes.REMOVE_FROM_WISHLIST_FAIL:
      return updateObject(state, {
        error: { _status: true },
        isRemovingFromWishlist: {
          ...state.isRemovingFromWishlist,
          [action.id]: false,
        },
      });
    case actionTypes.REMOVE_FROM_WISHLIST_SUCCESS:
      return updateObject(state, {
        isRemovingFromWishlist: {
          ...state.isRemovingFromWishlist,
          [action.id]: false,
        },
      });
    case actionTypes.SUBSCRIBE_WISHLIST_SUCCESS:
      return updateObject(state, {
        wishlist: action.wishlist,
      });
    case actionTypes.UNSUBSCRIBE_WISHLIST:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
