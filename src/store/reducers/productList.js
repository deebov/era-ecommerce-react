import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

const initialState = {
  lists: {},
  isLoading: {},
  error: false
};

const reducer = (state = initialState, action) => {
  const { listID: id } = action;
  switch (action.type) {
    case actionTypes.FETCH_LIST_START:
      return updateObject(state, {
        isLoading: { ...state.isLoading, [id]: true }
      });
    case actionTypes.FETCH_LIST_FAIL:
      return updateObject(state, {
        error: { _status: true },
        isLoading: { ...state.isLoading, [id]: false }
      });
    case actionTypes.FETCH_LIST_SUCCESS:
      return updateObject(state, {
        lists: { ...state.lists, [id]: action.products },
        isLoading: { ...state.isLoading, [id]: false }
      });
    default:
      return state;
  }
};

export default reducer;
