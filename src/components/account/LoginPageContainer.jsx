import React from 'react';
//import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
import { logUserIn } from '../../actions/authentication';

//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { incrementProgress, decrementProgress } from '../../actions/progress';
//import { loginAttempt, loginSuccess, loginFailure } from '../../actions/authentication';

import LoginPage from './LoginPage';

export class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);
        
    // bound functions
    //this.attemptLogIn = this.attemptLogIn.bind(this);
    this.logUserInFunction = this.logUserInFunction.bind(this);

/*     // component state
    this.state = {
        redirect: false,
      }; */
    }

    logUserInFunction(userData) {
      const { dispatch } = this.props;
      dispatch(logUserIn(userData));
    }

/*     async attemptLogIn(userData) {
        const {
            decrementProgressAction,
            incrementProgressAction,
            loginAttemptAction,
            loginFailureAction,
            loginSuccessAction,
          } = this.props;
    
        // turn on spinner
        incrementProgressAction();

        // register that a login attempt is being made
        loginAttemptAction();
    
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
              loginSuccessAction(json);
              this.setState({ redirect: true });
            } else {
              loginFailureAction(new Error('Authentication Failed'));
            }
          }).catch((error) => {
            loginFailureAction(new Error(error));
          });
    
        // turn off spinner
        decrementProgressAction();
    } */

      render() {
       // const { redirect } = this.state;
        const { authentication } = this.props;
    
        if (authentication.isLoggedIn) {
        //if (redirect) {
          return (
            <Redirect to="/" />
          );
        }
    
        return (
          <div>
            <LoginPage loginFunction={this.logUserInFunction} />
          </div>
        );
      }
  }

  /* function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      incrementProgressAction: incrementProgress,
      decrementProgressAction: decrementProgress,
      loginAttemptAction: loginAttempt,
      loginFailureAction: loginFailure,
      loginSuccessAction: loginSuccess,
    }, dispatch);
  } */

  function mapStateToProps(state) {
    return {
      authentication: state.authentication,
    };
  }
  
  export default connect(mapStateToProps)(LoginPageContainer);
  //export default connect(null, mapDispatchToProps)(LoginPageContainer);