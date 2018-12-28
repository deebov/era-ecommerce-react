import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notification: false,
  text: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION:
      return {
        notification: true,
        text: action.text,
      };

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        notification: false,
        text: null,
      };

    default:
      return state;
  }
};

export default reducer;
