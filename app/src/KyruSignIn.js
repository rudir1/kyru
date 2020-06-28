import React from 'react';
import { Grid, TextField, FormLabel, Button, Link } from '@material-ui/core';
import 'fontsource-roboto';
import Recoil from 'recoil';
import { Auth } from 'aws-amplify';
import { isAuthenticatedValue, userValue } from './kyru-auth';
import PasswordTextField from './PasswordTextField';

// type of sign in form
const SignInType = {
SIGN_IN: "Sign In",
SIGN_UP: "Sign Up",
CONFIRM_SIGN_UP: "Confirm Sign Up",
COMPLETE_NEW_PASSWORD: "Complete New Password",
FORGOT_PASSWORD_SUBMIT: "Forgot Password Submit",
} ;
Object.freeze(SignInType) ;

function KyruSignIn () {
  let [email, setEmail] = React.useState("") ;
  let [password, setPassword] = React.useState("") ;
  let [code, setCode] = React.useState("") ;
  let [error, setError] = React.useState("") ;
  let [signInType, setSignInType] = React.useState(SignInType.SIGN_IN) ;

  let setIsAuthenticated = Recoil.useSetRecoilState(isAuthenticatedValue) ;
  let [user, setUser] = Recoil.useRecoilState(userValue) ;

  let header = "" ; 
  let form ;

  // handle keystrokes in email text field
  function handleEmailChange (event) {
    setEmail (event.target.value) ;
  }

  // handle keystrokes in password text field
  function handlePasswordChange (event) {
    setPassword (event.target.value) ;
  }

  // handle keystrokes in code text field
  function handleCodeChange (event) {
    setCode (event.target.value) ;
  }

  // handle sign up button click
  // asynchronously invoke cognito Auth
  async function handleClickButtonSignUp (event) {
    event.preventDefault();
    setError("") ;

    try {
      const result = await Auth.signUp({
        'username': email,
        'password': password,
      }) ;
     console.log ("Sign up success: ", result) ;
     setUser(result.user) ;

     if (result.userConfirmed === false)
       setSignInType(SignInType.CONFIRM_SIGN_UP) ;
    }
    catch (error) {
      console.log ("Sign up failure: ", error) ;
      setError ("Failed - " + error.message) ;
    }
  }

  // handle confirm sign up button click
  // using the code emailed by cognito
  // asynchronously invoke cognito Auth
  async function handleClickButtonConfirmSignUp (event) {
    event.preventDefault();
    setError("") ;

    try {
      const result = await Auth.confirmSignUp(email, code)
      console.log ("Confirm sign up success: ", result) ;
      setIsAuthenticated(true) ;
    }
    catch (error) {
      console.log ("Confirm sign up failure: ", error) ;
      setError ("Failed - " + error.message) ;
    }

    setCode("") ;
  }

  // handle sign in button click
  // asynchronously invoke cognito Auth
  async function handleClickButtonSignIn (event) {
    event.preventDefault();
    setError("") ;

    try {
      const result = await Auth.signIn(email, password) ;
      console.log ("Sign in success: ", result) ;
      setUser(result) ;

      if (result.challengeName === 'NEW_PASSWORD_REQUIRED')
        setSignInType(SignInType.COMPLETE_NEW_PASSWORD) ;
      else
        setIsAuthenticated(true) ;
    }
    catch (error) {
      console.log ("Sign in failure: ", error) ;
      setError ("Failed - " + error.message) ;
    }
  }

  // handle complete new password button click
  // when sign in
  // asynchronously invoke cognito Auth
  async function handleClickButtonCompleteNewPassword (event) {
    event.preventDefault();
    setError("") ;

    try {
      const result = await Auth.completeNewPassword (user, password)
      console.log ("Complete new password success: ", result) ;
      setIsAuthenticated(true) ;
    }
    catch (error) {
      console.log ("Complete new password failure: ", error) ;
      setError ("Failed - " + error.message) ;
    }
  }

  // handle forgot password button click
  // asynchronously invoke cognito Auth
  async function handleClickButtonForgotPasswordSubmit (event) {
    event.preventDefault();
    setError("") ;

    try {
      const result = await Auth.forgotPasswordSubmit (user, code, password)
      console.log ("Forgot password submit success: ", result) ;
      setIsAuthenticated(true) ;
    }
    catch (error) {
      console.lgg ("Forgot password submit failure: ", error) ;
      setError ("Failed - " + error.message) ;
    }
  }

  // handle sign up link click
  // change the sign in type state of the component to SIGN_UP
  async function handleClickLinkSignUp (event) {
    event.preventDefault();
    setError("") ;
    setSignInType(SignInType.SIGN_UP) ;
  }

  // handle sign in link click
  // change the sign in type state of the component to SIGN_IN
  async function handleClickLinkSignIn (event) {
    event.preventDefault();
    setError("") ;
    setSignInType(SignInType.SIGN_IN) ;
  }

  // handle send new code link click
  // asynchronously invoke cognito auth
  async function handleClickLinkSendNewCode (event) {
    event.preventDefault();
    setError("") ;

    try {
      const result = await Auth.resendSignUp (email)
      console.log ("Send new code success: ", result) ;
    }
    catch (error) {
      console.log ("Send new code failure: ", error) ;
      setError ("Failed - " + error.message) ;
    }
  }

  // handle confirm sign up link click
  async function handleClickLinkConfirmSignUp (event) {
    event.preventDefault();
    setError("") ;
    setSignInType(SignInType.CONFIRM_SIGN_UP) ;
  }

  // handle forgot password link click
  // change the sign in type state of the component to FORGOT_PASSWORD_SUBMIT
  // asynchronously invoke cognito auth to send a code for a new password
  async function handleClickLinkForgotPassword (event) {
    event.preventDefault();
    setError("") ;

    try {
      const result = await Auth.forgotPassword (email) ;
      console.log ("Send new code success: ", result) ;
    }
    catch (error) {
      console.log ("Send new code failure: ", error) ;
      setError ("Failed - " + error.message) ;
    }
  }

  // create a header based on the sign in type state of the component
  // append previous error if it occured
  if (signInType === SignInType.SIGN_UP) {
    header = "Kyru Sign Up"
    if (error !== "")
      header = header + " " + error ;
  }
  else if (signInType === SignInType.CONFIRM_SIGN_UP) {
    header = "Kyru Sign Up Confirmation"
    if (error !== "")
      header = header + " " + error ;
  }
  else {
    header = "Kyru Sign In"
    if (error !== "")
      header = header + " " + error ;
  }

  // create an input form based on the sign in type state of the component
  if (signInType === SignInType.SIGN_UP) {
    form = (
      <>
        <Grid item>
          <TextField label="Email Address" value={email} onChange={handleEmailChange} variant="outlined" type="email" fullWidth={true}/>
        </Grid>
        <Grid item>
          <PasswordTextField value={password} onChange={handlePasswordChange}/>
        </Grid>
        <Grid item>
         <Button variant="contained" color="primary" fullWidth={true} onClick={handleClickButtonSignUp}>Sign Up</Button>
        </Grid>
        <Grid item>
         <Link onClick={handleClickLinkSignIn}>Sign In</Link>
        </Grid>
      </>
    );
  }
  else if (signInType === SignInType.CONFIRM_SIGN_UP) {
    form = (
      <>
        <Grid item>
          <TextField label="Email Address" value={email} onChange={handleEmailChange} variant="outlined" type="email" fullWidth={true}/>
        </Grid>
        <Grid item>
          <TextField label="Confirmation Code" value={code} onChange={handleCodeChange} variant="outlined" type="text" fullWidth={true}/>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" fullWidth={true} onClick={handleClickButtonConfirmSignUp}>Confirm Sign Up</Button>
        </Grid>
        <Grid item>
          <Link onClick={handleClickLinkSendNewCode}>Send New Code</Link>
        </Grid>
      </>
    );
  }
  else if (signInType === SignInType.COMPLETE_NEW_PASSWORD) {
    form = (
      <>
        <Grid item>
          <TextField label="Email Address" value={email} onChange={handleEmailChange} variant="outlined" type="email" fullWidth={true}/>
        </Grid>
        <Grid item>
          <TextField label="New Password" value={password} onChange={handlePasswordChange} variant="outlined" type="text" fullWidth={true}/>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" fullWidth={true} onClick={handleClickButtonCompleteNewPassword}>Confirm Sign Up</Button>
        </Grid>
      </>
    );
  }
  else if (signInType === SignInType.FORGOT_PASSWORD) {
    form = (
      <>
        <Grid item>
          <TextField label="Email Address" value={email} onChange={handleEmailChange} variant="outlined" type="email" fullWidth={true}/>
        </Grid>
        <Grid item>
          <TextField label="New Password" value={password} onChange={handlePasswordChange} variant="outlined" type="text" fullWidth={true}/>
        </Grid>
        <Grid item>
          <TextField label="Confirmation Code" value={code} onChange={handleCodeChange} variant="outlined" type="text" fullWidth={true}/>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" fullWidth={true} onClick={handleClickButtonForgotPasswordSubmit}>Submit New Password</Button>
        </Grid>
        <Grid item>
          <Link onClick={handleClickLinkSignUp}>Sign Up</Link>
          <Link onClick={handleClickLinkForgotPassword}>Forgot Password</Link>
        </Grid>
      </>
    );
  }
  else { // if (signInType === SignInType.SIGN_IN)
    form = (
      <>
        <Grid item>
          <TextField label="Email Address" value={email} onChange={handleEmailChange} variant="outlined" type="email" fullWidth={true}/>
        </Grid>
        <Grid item>
          <PasswordTextField value={password} onChange={handlePasswordChange}/>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" fullWidth={true} onClick={handleClickButtonSignIn}>Sign In</Button>
        </Grid>
        <Grid item>
          <Link onClick={handleClickLinkSignUp}>Sign Up</Link>
          <Link onClick={handleClickLinkConfirmSignUp}>Confirm Sign Up</Link>
          <Link onClick={handleClickLinkForgotPassword}>Forgot Password</Link>
        </Grid>
      </>
    );
  }
 
  // render the component
  return (
    <div>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" alignContent="center" spacing={4}>
        <Grid item>
          <FormLabel>{header}</FormLabel>
        </Grid>
      </Grid>
      <form>
        <Grid container direction="column" justify="flex-end" alignItems="stretch" alignContent="center" spacing={1}>
          {form}
        </Grid>
      </form>
    </div>
  ) ;
}

export default KyruSignIn;
