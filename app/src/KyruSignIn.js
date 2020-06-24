import React from 'react';
import { Grid, TextField, FormLabel } from '@material-ui/core';
import 'fontsource-roboto';
import Recoil from 'recoil';
import { emailValue, passwordValue } from './kyru-auth';

function KyruSignIn () {
  let [email, setEmail] = Recoil.useRecoilState(emailValue) ;
  let [password, setPassword] = Recoil.useRecoilState(passwordValue) ;

  function handleEmailChange (event) {
    setEmail (event.target.value) ;
  }

  function handlePasswordChange (event) {
    setPassword (event.target.value) ;
  }

  return (
      <form noValidate autoComplete="off">
        <Grid container direction="column" justify="center" alignItems="center" alignContent="center" spacing={1}>
          <Grid item>
            <FormLabel>Kyru Log In</FormLabel>
          </Grid>
          <Grid item>
            <TextField label="Email Address" value={email} onChange={handleEmailChange} variant="outlined"/>
          </Grid>
          <Grid item>
            <TextField label="Password" value={password} onChange={handlePasswordChange} variant="outlined" />
          </Grid>
        </Grid>
      </form>
  ) ;
}

export default KyruSignIn;
