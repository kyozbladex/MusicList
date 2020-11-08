import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';

// Action Creators
export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

// Log User In
export function logUserIn(userData) {
    return async (dispatch) => {
//async attemptLogIn(userData) {
   /*  const {
        decrementProgressAction,
        incrementProgressAction,
        loginAttemptAction,
        loginFailureAction,
        loginSuccessAction,
      } = this.props; */

    // turn on spinner
    dispatch(incrementProgress());
    //incrementProgressAction();

    // register that a login attempt is being made
    dispatch(loginAttempt());
   // loginAttemptAction();

    // contact login API
    await fetch(
      // where to contact
      '/api/authentication/login',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    ).then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      }).then((json) => {
        if (json) {
          dispatch(loginSuccess(json));
        //  loginSuccessAction(json);
        //  this.setState({ redirect: true });
        } else {
          dispatch(loginFailure(new Error('Authentication Failed')));
          //loginFailureAction(new Error('Authentication Failed'));
        }
      }).catch((error) => {
        dispatch(loginFailure(new Error(error)));
       // loginFailureAction(new Error(error));
      });

    // turn off spinner
   return dispatch(decrementProgress());
   // decrementProgressAction();
};
}

// Log User Out
//async logUserOut(userData) {
export function logUserOut() {
    return async (dispatch) => {
   /*  const {
      decrementProgressAction,
      incrementProgressAction,
      logoutFailureAction,
      logoutSuccessAction,
    } = this.props;
 */
    // turn on spinner
    dispatch(incrementProgress());
   // incrementProgressAction();

    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/logout',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
    .then((response) => {
        if (response.status === 200) {
            dispatch(logoutSuccess());
          } else {
            dispatch(logoutFailure(`Error: ${response.status}`));
          }
      /* if (response.status === 200) {
        return logoutSuccessAction();
      }
      return logoutFailureAction(`Error: ${response.status}`); */
    })
    .catch((error) => {
        dispatch(logoutFailure(error));
     // logoutFailureAction(error);
    });

    // turn off spinner
    return dispatch(decrementProgress());
    //decrementProgressAction();
}
}