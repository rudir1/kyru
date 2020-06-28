import React from 'react';
import { FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function PasswordTextField (props) {
  let [showPassword, setShowPassword] = React.useState(false) ;

  function handleClickShowPassword (event) {
    setShowPassword (!showPassword) ;
  };

  function handleMouseDownPassword (event) {
    event.preventDefault();
  };

  return (
    <>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={props.value}
                onChange={props.onChange}
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
    </>
  ) ;
}
