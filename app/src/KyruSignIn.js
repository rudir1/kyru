import React from 'react';
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { Switch, Route } from "react-router-dom";

// Kyru Sign In Component

function KyruSignIn(props) {
  const history = useHistory() ;
  const authErrorRef = React.useRef(null) ;

  // React.useEffect(() => {}, [signInTypeRef, authErrorRef]) ;

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
        userPoolWebClientId: '45v2vr8g8pdaj0r48pmmsag4mj',

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
        //     scope: ['email', 'profile', 'openid'],
        //     redirectSignIn: 'http://kyru.io/oauth2/kyru',
        //     redirectSignOut: 'http://kyru.io',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
    }
});

  // error handler
  function handleError(error) {
    authErrorRef.current = JSON.stringify(error);
    console.log('error: ', authErrorRef.current);
  }
 
  // error handler
  function handleSuccess(success) {
    console.log('success: ', JSON.stringify (success));
    authErrorRef.current = null ;
    history.replace("/main") ;
  }
 
  // handle sign up success
  function handleSignUpSuccess(success) {
    console.log('success: ', JSON.stringify (success));
    history.replace("/main") ;
  }

  // handle sign up error
  function handleSignUpError(error) {
    console.log(this.name + ': ', JSON.stringify (error));
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
            }
    })
    .then(handleSignUpSuccess)
    .catch(handleSignUpError) ;
  }

  // refresh the component to request a new password
  function handleNewPasswordRequired() {
    history.push("/newpasswordrequired") ;
  }

  // complete new password
  function handleCompleteNewPassword() {
    const newPassword = document.getElementById('newpassword').value ;
    Auth.currentAuthenticatedUser()
    .then (user => Auth.completeNewPassword(user, newPassword))
    .then(handleSuccess)
    .catch(handleError) ;
  }

  // challenge name successful
  function handleChallengeNameSuccess(user) {
    console.log(this.name + ': ', JSON.stringify (user));
    history.replace('/main');
  }

  // implement a challenge
  function handleChallengeName(user) {
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED')
      handleNewPasswordRequired();
    else
      handleChallengeNameSuccess(user);
  }

  // handle sign in error
  function handleSignInError(error) {
    console.log(this.name + ': ', JSON.stringify (error));
  }

  // sign in
  function handleSignIn() {
    const email = document.getElementById('email').value ;
    const password = document.getElementById('password').value ;
    Auth.signIn(email, password)
    .then(handleChallengeName)
    .catch (handleSignInError) ;
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

  function handleForgotPasswordResponse(response) {
    history.push('/kyru/forgotpassword') ;
  }

  function handleForgotPasswordError(error) {
    history.replace ('/kyru/signin') ;
  }

// forgot password
  function handleForgotPassword() {
    const email = document.getElementById('email').value ;
    Auth.forgotPassword(email)
    .then(handleForgotPasswordResponse)
    .catch(handleForgotPasswordError);
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
  function InsertAuthError (props) {
    return (
      <div>
        <label>{props.error}</label><br></br>
      </div>
    );
  }

  let error = null ;

  if (authErrorRef !== null) {
    error = JSON.stringify(authErrorRef.current);
    console.log ("Valid authError: ", error) ;
  }

  // sign in
  function SignIn () {
    return (
      <div>
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
  } ;

  // change password
  function ChangePassword () {
    return (
      <div>
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

  function ForgotPassword () {
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

  function NewPasswordRequired () {
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

  // render
  return (
    <div className="KyruSignInSwitch">
      <Switch>
        <Route path="/kyru/signin">
          <SignIn/>
        </Route>
        <Route path="/kyru/changepassword">
          <ChangePassword/>
        </Route>
        <Route path="/kyru/forgotpassword">
          <ForgotPassword/>
        </Route>
        <Route path="/kyru/newpasswordrequired">
          <NewPasswordRequired/>
        </Route>
      </Switch>
    </div>
  ) ;
}

export default KyruSignIn;
