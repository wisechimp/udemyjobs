import { AsyncStorage } from 'react-native';
import { AccessToken } from 'react-native-fbsdk';
import firebase from '@firebase/app';
import '@firebase/auth';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async dispatch => {
  let fbToken = await AsyncStorage.getItem('fb_token');
  if (fbToken) {
    //Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: fbToken });
  } else {
    // Start up FB login process
    runFacebookLogin(dispatch);
  }
};

//Helper function so doesn't need the more complex double arrow
const runFacebookLogin = async dispatch => {
  const credential = firebase.auth.FacebookAuthProvider
  .credential(AccessToken.getCurrentAccessToken);
  let { type, token } = await firebase.auth().signInWithCredential(credential);

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });

/*
  return (dispatch) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(
        (result) => {
          if (result.isCancelled) {
            console.log('Whoops!', 'You cancelled the sign in.');
          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                firebase.auth().signInWithCredential(credential)
                  .then(loginUserSuccess(dispatch))
                  .catch((error) => {
                    loginSignUpFail(dispatch, error.message);
                  });
              });
          }
        },
        (error) => {
          console.log('Sign in error', error);
        },
      );
  };*/
};
