import React from 'react';
import { Grid, TextField, FormLabel, Button, FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton, Link } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import 'fontsource-roboto';
import Recoil from 'recoil';
import { Auth } from 'aws-amplify';
import { isAuthenticatedValue } from './kyru-auth';

const SignInType = {
SIGN_IN: "Sign In",
SIGN_UP: "Sign Up",
CONFIRM_SIGN_UP: "Confirm Sign Up",
} ;
Object.freeze(SignInType) ;

function KyruSignIn () {
  let setIsAuthenticated = Recoil.useSetRecoilState(isAuthenticatedValue) ;
  let [email, setEmail] = React.useState("") ;
  let [password, setPassword] = React.useState("") ;
  let [showPassword, setShowPassword] = React.useState(false) ;
  let [code, setCode] = React.useState("") ;
  let [error, setError] = React.useState("") ;
  let [signInType, setSignInType] = React.useState(SignInType.SIGN_IN) ;
  let header = "" ; 
  let signInButtonText = "" ; 

  React.useEffect (() => {
  }, [showPassword, email, password, code, error, signInType]) ;

  function handleEmailChange (event) {
    setEmail (event.target.value) ;
  }

  function handlePasswordChange (event) {
    setPassword (event.target.value) ;
  }

  function handleClickShowPassword (event) {
    setShowPassword (!showPassword) ;
  };

  function handleMouseDownPassword (event) {
    event.preventDefault();
  };

  async function handleSignInClickButton (event) {
    event.preventDefault();

    if (signInType === SignInType.SIGN_UP) {
      try {
        const result = await Auth.signUp({
         'username': email,
         'password': password,
         attributes: {
           'email': email,          // optional
         }
       }) ;
       console.log ("Sign up success: ", result) ;
       setSignInType(SignInType.CONFIRM_SIGN_UP) ;
      }
      catch (error) {
        console.log ("Sign up failure: ", error) ;
        setError ("Failed - " + error.message) ;
      }
    }
    else if (signInType === SignInType.CONFIRM_SIGN_UP) {
      try {
        const result = Auth.confirmSignUp(email, code)
        console.log ("Confirm sign up success: ", result) ;
        setIsAuthenticated(true) ;
      }
      catch (error) {
        console.log ("Confirm sign up failure: ", error) ;
        setError ("Failed - " + error.message) ;
      }
    }
    else {
      try {
        const user = await Auth.signIn(email, password) ;
        console.log ("Sign in success: ", user) ;
        setIsAuthenticated(true) ;
      }
      catch (error) {
        console.log ("Sign in failure: ", error) ;
        setError ("Failed - " + error.message) ;
      }
    }
  }

  async function handleSignUpClickButton (event) {
    event.preventDefault();
    setSignInType(SignInType.SIGN_UP) ;
  }

  if (signInType === SignInType.SIGN_UP) {
    header = "Kyru Sign Up"
    if (error !== "")
      header = header + " " + error ;

    signInButtonText = "Sign Up" ;
  }
  else if (signInType === SignInType.CONFIRM_SIGN_UP) {
  }
  else {
    header = "Kyru Sign In"
    if (error !== "")
      header = header + " " + error ;

    signInButtonText = "Sign In" ;
  }

  return (
    <div>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" alignContent="center" spacing={4}>
        <Grid item>
          <FormLabel>{header}</FormLabel>
        </Grid>
      </Grid>
      <form>
        <Grid container direction="column" justify="flex-end" alignItems="stretch" alignContent="center" spacing={1}>
          <Grid item>
            <TextField label="Email Address" value={email} onChange={handleEmailChange} variant="outlined" type="email" fullWidth={true}/>
          </Grid>
          <Grid item>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" fullWidth={true} onClick={handleSignInClickButton}>{signInButtonText}</Button>
          </Grid>
          {(signInType === SignInType.SIGN_IN) ?
            <Grid item>
              <Link onClick={handleSignUpClickButton}>Sign Up</Link>
            </Grid> : 
            <></>
          }
        </Grid>
      </form>
    </div>
  ) ;
}

export default KyruSignIn;
