import React from 'react';

// enumerator for google load state

const GoogleSignInState = {
  INIT: 0,
  ERROR: 1,
  CATCH: 2
};
Object.freeze(GoogleSignInState);

// google oauth2 api stuff

let gapi = window.gapi ;
let gapiRenderOptions = {
  scope: 'email profile iopenid',
//  width: 200,
//  height: 50,
//  longtitle: true,
  theme: 'light',
//  onsuccess: handleSuccess,
//  onfailure: handleFailure
} ;
let gapiClientConfig = {
  client_id: '1086335094551-q0vbi5a05o2dghg1nge2ejkg5oqvkilm.apps.googleusercontent.com',
  scope: 'email profile iopenid',
} ;

// Google Sign In Component

function GoogleSignIn() {
  let [googleSignInState, setGoogleSignInState] = React.useState(GoogleSignInState.INIT) ;

  function onInit(value) {
    gapi.signin2.render('GoogleSignInButton', gapiRenderOptions);
    console.log ("Google API init success.") ;
  }

  function onError(value) {
    console.log ("Google API init error.") ;
    setGoogleSignInState(GoogleSignInState.ERROR) ;
  }

  function onCatch(value) {
    console.log ("Google API puked.") ;
    setGoogleSignInState(GoogleSignInState.CATCH) ;
  }

  React.useEffect(() => {
    gapi.load('auth2', function() {
      gapi.auth2.init(gapiClientConfig)
      .then(onInit, onError)
      .catch(onCatch) ;
    }) ;
  }) ;

  if (googleSignInState === GoogleSignInState.INIT) {
    return (
      <div id='GoogleSignInButton'/>
    ) ;
  }

  return (
    <div>Could not initialize Google Sign In.</div>
  ) ;
}

export default GoogleSignIn;
