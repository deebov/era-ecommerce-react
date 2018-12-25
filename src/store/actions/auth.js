import * as actionTypes from './actionTypes';

export const switchShowAuth = () => {
  return {
    type: actionTypes.SWITCH_SHOW_AUTH
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authSuccess = (token, userID) => {
  return {
    type: actionTypes.AUTH_SUCCESS
  };
};

export const auth = (email, password, method) => async (
  dispatch,
  getState,
  { firebase }
) => {
  dispatch(authStart());

  try {
    let authData = {};
    let token = null
    if (method === 'login') {
      authData = await firebase.doSignInWithEmailAndPassword(email, password);
      token = await firebase.auth.currentUser.getIdToken()
      console.log(token);
      
    } else {
      authData = await firebase.doCreateUserWithEmailAndPassword(
        email,
        password
      );
    }
    
    
    dispatch(authSuccess(authData.idToken, authData.localId));
  } catch (error) {
    console.log(error);

    dispatch(authFail(error));
  }
};
