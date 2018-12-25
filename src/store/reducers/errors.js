import * as actionTypes from '../actions/actionTypes';

/**
 * TODO
 * improve error handling by collecting each error
 * and sending them to server
 */

const initialState = {
  error: false,
  text: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ERROR:
      return {
        error: true,
        text: action.text
      };

    case actionTypes.REMOVE_ERROR:
      return {
        error: false,
        text: null
      };

    default:
      return state;
  }
};

export default reducer;
