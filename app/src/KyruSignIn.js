import React from 'react';
import { Grid, TextField, FormLabel, Button, FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import 'fontsource-roboto';
import Recoil from 'recoil';
import { emailValue, passwordValue } from './kyru-auth';

function KyruSignIn () {
  let [email, setEmail] = Recoil.useRecoilState(emailValue) ;
  let [password, setPassword] = Recoil.useRecoilState(passwordValue) ;
  let [showPassword, setShowPassword] = React.useState(false) ;

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

  function handleClickButton (event) {
    console.log ("Submit") ;
    event.preventDefault();
  }

  return (
      <form>
        <Grid container direction="column" justify="flex-end" alignItems="stretch" alignContent="center" spacing={1}>
          <Grid item>
            <FormLabel>Kyru Sign In</FormLabel>
          </Grid>
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
            <Button variant="contained" color="primary" fullWidth={true} onClick={handleClickButton}>Sign In</Button>
          </Grid>
        </Grid>
      </form>
  ) ;
}

export default KyruSignIn;
