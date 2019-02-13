import * as actionsTypes from './actionTypes';

export const showLoadingBar = id => {
  return {
    type: actionsTypes.SHOW_LOADING_BAR,
    id,
  };
};

export const hideLoadingBar = id => {
  return {
    type: actionsTypes.HIDE_LOADING_BAR,
    id,
  };
};
