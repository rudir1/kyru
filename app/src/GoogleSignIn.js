// import React from 'react';
// import { useHistory } from "react-router-dom";

// Google Sign In Component

function GoogleSignIn(props) {
//   const history = useHistory();

  if (! props.authorized) {
    let client_id = '1086335094551-q0vbi5a05o2dghg1nge2ejkg5oqvkilm.apps.googleusercontent.com';
    let url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('scope', 'email profile openid');
    url.searchParams.set('response_type', 'token');
    url.searchParams.set('state', 'random_value_here');
    url.searchParams.set('redirect_uri', 'https://www.kyru.io/oauth2/google');
    url.searchParams.set('client_id', client_id);
  
    let path = encodeURIComponent(url);
    console.log("Signing in to google");
    console.log(path);
  
    window.location.href = path ;
  }

  return null ;
}

export default GoogleSignIn;
