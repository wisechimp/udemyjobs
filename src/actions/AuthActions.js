import { AsyncStorage } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from '@firebase/app';
import '@firebase/auth';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    //Dispatch an action saying FB login is done
    console.log('We have a token apparently!');
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB login process
    console.log('We do not have a token');
    runFacebookLogin(dispatch);
  }
};

//Helper function so doesn't need the more complex double arrow
const runFacebookLogin = async dispatch => {
  console.log('Running Facebook Login');
  let { type, token } = await LoginManager.logInWithReadPermissions(['public_profile']);

  if (type === 'cancel') {
    console.log('Login cancelled');
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  console.log('Login successful?');

  token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);

  if (token === null) {
    console.log('We do not appear to have retrieved a token');
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }


  console.log('Let\'s save this token then.');
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
