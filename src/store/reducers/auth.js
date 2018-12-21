import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/index';

const initialState = {
  showAuth: false,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_SHOW_AUTH:
      return updateObject(state, { showAuth: !state.showAuth });
    default:
      return state;
  }
};

export default reducer;
