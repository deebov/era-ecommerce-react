import * as actionsTypes from './actionTypes';

export const addNotification = text => {
  return {
    type: actionsTypes.ADD_NOTIFICATION,
    text
  };
};

export const removeNotification = () => {
  return {
    type: actionsTypes.REMOVE_NOTIFICATION
  };
};
