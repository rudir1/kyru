import React from 'react';
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';

// Type of Sign In Component to display

const KyruSignInType = {
SIGN_IN: 'signin',
SIGN_OUT: 'signout',
CHANGE_PASSWORD: 'changepassword',
FORGOT_PASSWORD: 'forgotpassword',
COMPLETE_NEW_PASSWORD: 'completenewpassword',
DONE: 'done'
}
Object.freeze(KyruSignInType);

// Kyru Sign In Component

function KyruSignIn(props) {
  const history = useHistory() ;
  const authErrorRef = React.useRef(null) ;
  const signInTypeRef = React.useRef(props.signInType) ;

  React.useEffect(() => {}, [signInTypeRef, authErrorRef]) ;

Amplify.configure({

    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_gaxiIGccJ',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '16l7u0di6lr7f4rg2ap4lhkj6',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: '.kyru.io',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'auth.kyru.io',
        //     scope: ['phone', 'email', 'profile', 'openid'],
        //     redirectSignIn: 'http://auth.kyru.io/login',
        //     redirectSignUp: 'http://auth.kyru.io/login',
        //     redirectSignOut: 'http://kyru.io',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
    }
});

  // error handler
  function handleError(error) {
    console.log('error: ' + error.toString());
    authErrorRef.current = error ;
  }
 
  // error handler
  function handleSuccess(success) {
    console.log('success: ' + success);
    authErrorRef.current = null ;
    history.replace("/main") ;
    signInTypeRef.current = KyruSignInType.DONE ;
  }
 
  // sign up
  function handleSignUp() {
    const email = document.getElementById('email').value ;
    const password = document.getElementById('password').value ;
    Auth.signUp({
            'username': email,
            'password': password,
            attributes: {
                'email': email,          // optional
                // phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
    })
    .then(handleSuccess)
    .catch(handleError) ;
  }

  // refresh the component to request a new password
  function handleNewPasswordRequired() {
    signInTypeRef.current = KyruSignInType.NEW_PASSWORD_REQUIRED ;
  }

  // complete new password
  function handleCompleteNewPassword() {
    const newPassword = document.getElementById('newpassword').value ;
    Auth.currentAuthenticatedUser()
    .then (user => Auth.completeNewPassword(user, newPassword))
    .then(handleSuccess)
    .catch(handleError) ;
  }

  function handleChallengeName(user) {
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED')
      handleNewPasswordRequired();
    else
      handleSuccess(user);
  }

  // sign in
  function handleSignIn() {
    const email = document.getElementById('email').value ;
    const password = document.getElementById('password').value ;
    Auth.signIn(email, password)
    .then(handleChallengeName)
    .catch (handleError) ;
  }

// change password
  function handleChangePassword() {
      const oldPassword = document.getElementById('oldpassword').value ;
      const newPassword = document.getElementById('newpassword').value ;
      Auth.currentAuthenticatedUser()
      .then((user) => { Auth.changePassword(user, oldPassword, newPassword); })
      .then(handleSuccess)
      .catch(handleError);
  }

// forgot password
  function handleForgotPassword() {
    const email = document.getElementById('email').value ;
    Auth.forgotPassword(email)
    .then((user) => { signInTypeRef.current = KyruSignInType.FORGOT_PASSWORD; })
    .catch(handleError);
  }

// Collect confirmation code and new password
  function handleForgotPasswordSubmit() {
    const email = document.getElementById('email').value ;
    const newPassword = document.getElementById('newpassword').value ;
    const code = document.getElementById('code').value ;
    Auth.forgotPasswordSubmit(email, code, newPassword)
    .then(handleSuccess)
    .catch(handleError);
  }

  // display an authentication error
  function InsertAuthError () {
    if (authErrorRef.current) {
      return (
      <div>
        <label>authErrorRef.current</label><br></br> ;
      </div>
      );
    }
    else {
      return null ;
    }
  }

  // render
  if (signInTypeRef.current === KyruSignInType.DONE) {
    return null ;
  }
  else if (signInTypeRef.current === KyruSignInType.SIGN_IN) {
    return (
      <div>
        <InsertAuthError/>
        <form id="signin">
          <label>Email address:</label>
          <input type="email" id="email" name="email"></input>
          <br></br>
          <label>Password:</label>
          <input type="password" id="password" name="password"></input>
          <br></br>
          <input type="submit" value="Sign In" onClick={handleSignIn}></input>
          <input type="submit" value="Sign Up" onClick={handleSignUp}></input>
          <input type="submit" value="Forgot password" onClick={handleForgotPassword}></input>
        </form>
      </div>
    ) ;
  }
  else if (signInTypeRef.current === KyruSignInType.CHANGE_PASSWORD) {
    return (
      <div>
        <InsertAuthError/>
        <form id="changepassword">
          <label>Old password:</label>
          <input type="password" id="oldpassword" name="old password"></input>
          <br></br>
          <label>New password:</label>
          <input type="password" id="newpassword" name="new password"></input>
          <br></br>
          <input type="submit" value="Change password" onClick={handleChangePassword}></input>
        </form>
      </div>
    ) ;
  }
  else if (signInTypeRef.current === KyruSignInType.FORGOT_PASSWORD) {
    return (
      <div>
        <InsertAuthError/>
        <form id="forgotpassword">
          <label>Verification code:</label>
          <input type="text" id="code" name="code"></input>
          <br></br>
          <label>Email address:</label>
          <input type="email" id="email" name="email"></input>
          <br></br>
          <label>New password:</label>
          <input type="password" id="newpassword" name="new password"></input>
          <br></br>
          <input type="submit" value="Forgot password" onClick={handleForgotPasswordSubmit}></input>
        </form>
      </div>
    ) ;
  }
  else if (signInTypeRef.current === KyruSignInType.COMPLETE_NEW_PASSWORD) {
    return (
      <div>
        <InsertAuthError/>
        <form id="newpasswordrequired">
          <label>New password:</label>
          <input type="password" id="newpassword" name="new password"></input>
          <br></br>
          <input type="submit" value="New password" onClick={handleCompleteNewPassword}></input>
        </form>
      </div>
    );
  }
}

export { KyruSignIn, KyruSignInType} ;
