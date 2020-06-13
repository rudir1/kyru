import React from 'react';
import axios from 'axios';

// Google Sign In Component

function GoogleSignIn() {

  function onGetTokenSuccess(response){
    console.log ("Google sign in success");
    console.log(response);
  }
  
  function onGetTokenError(error){
    console.log ("Google sign in error");
    console.log(error);
  }

  function onGetTokenCatch(error){
    console.log ("Google sign in exception");
    console.log(error);
  }

  function onClick() {
    let client_id='1086335094551-q0vbi5a05o2dghg1nge2ejkg5oqvkilm.apps.googleusercontent.com';
    let url= {
               method: 'get',
               url: 'https://accounts.google.com/o/oauth2/v2/auth',
               params: {
                 scope: 'email profile openid',
                 response_type: 'token',
                 state: 'random_value_here',
                 redirect_uri: 'https://www.kyru.io',
                 client_id: client_id,
               },
             } ;

    axios(url)
    .then(onGetTokenSuccess,onGetTokenError)
    .catch(onGetTokenCatch);
  }

  return (
    <div>
      <button onClick={onClick}>Google Sign In</button>
    </div>
  ) ;
}

export default GoogleSignIn;
