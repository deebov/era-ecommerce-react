import * as actionTypes from '../actions/actionTypes';

const initialState = {
  show: false,
  active: {},
};

const calculateShowStatus = active =>
  Object.values(active).reduce((prev, curr) => prev && curr);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADING_BAR:
      const active = {
        ...state.active,
        [action.id]: true,
      };

      return {
        active,
        show: calculateShowStatus(active),
      };

    case actionTypes.HIDE_LOADING_BAR:
      const active1 = {
        ...state.active,
        [action.id]: false,
      };
      return {
        active: active1,
        show: calculateShowStatus(active1),
      };

    default:
      return state;
  }
};

export default reducer;
