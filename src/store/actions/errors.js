import * as actionsTypes from './actionTypes';

export const addError = () => {
  return {
    type: actionsTypes.ADD_ERROR
  };
};

export const removeError = () => {
  return {
    type: actionsTypes.REMOVE_ERROR
  };
};
