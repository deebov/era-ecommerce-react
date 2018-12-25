import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/index';

const initialState = {
  token: null,
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
        token: action.token,
        userId: action.userId,
        loading: false
      });
    default:
      return state;
  }
};

export default reducer;
