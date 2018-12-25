import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/index';

const initialState = {
  userId: null,
  showAuth: false,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_SHOW_AUTH:
      return updateObject(state, { showAuth: !state.showAuth });
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        userId: action.uid ? action.uid : state.userId,
        loading: false
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null, loading: null });
    default:
      return state;
  }
};

export default reducer;
