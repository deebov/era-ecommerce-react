import * as actionsTypes from './actionTypes';

export const addError = text => {
  return {
    type: actionsTypes.ADD_ERROR,
    text
  };
};

export const removeError = () => {
  return {
    type: actionsTypes.REMOVE_ERROR
  };
};
