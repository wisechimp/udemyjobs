import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS } from './types';

export const facebookLogin = () => async dispatch => {
  let fbToken = await AsyncStorage.getItem('fb_token');
  if (fbToken) {
    //Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: fbToken });
  } else {
    // Start up FB login process
    runFacebookLogin();
  }
};

//Helper function so doesn't need the more complex double arrow
const runFacebookLogin = async () => {
  //let result = await FACEbook.logInWithReadPermissionsAsync('appId', {
  // permissions: ['public-profile']}); although we don't even want this access!
};
