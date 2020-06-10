import React from 'react';

// enumerator for google load state

const GoogleSignInState = {
  INIT: 0,
  ERROR: 1,
  CATCH: 2,
  SUCCESS: 3
};
Object.freeze(GoogleSignInState);

// google oauth2 api stuff

let gapi = window.gapi ;
let gapiRenderOptions = {
  scope: 'email profile openid',
//  width: 200,
//  height: 50,
//  longtitle: true,
  theme: 'light',
//  onsuccess: handleSuccess,
//  onfailure: handleFailure
} ;
let gapiClientConfig = {
  client_id: '1086335094551-q0vbi5a05o2dghg1nge2ejkg5oqvkilm.apps.googleusercontent.com',
  scope: 'email profile openid',
} ;

// Google Sign In Component

function GoogleSignIn() {
  let givenName ;
  let familyName ;
  const [googleSignInState, setGoogleSignInState] = React.useState(GoogleSignInState.INIT) ;
  const googleAuthRef = React.useRef(null) ;

  function onSignIn(googleUser) {
    let basicProfile = getBasicProfile() ;
    givenName = basicProfile.getGivenName() ;
    familyName = basicProfile.getFamilyName() ;
    console.log ("Google API sign in success.") ;
    setGoogleSignInState(GoogleSignInState.SUCCESS) ;
  }

  function onInit(value) {
    gapiRenderOptions.onsuccess = onSignIn ;
    gapi.signin2.render('GoogleSignInButton', gapiRenderOptions);
    googleAuthRef.current = gapi.auth2.getAuthInstance();
    console.log ("Google API init success.") ;
    setGoogleSignInState(GoogleSignInState.INIT) ;
  }

  function onError(value) {
    console.log ("Google API init error. " + value) ;
    setGoogleSignInState(GoogleSignInState.ERROR) ;
  }

  function onCatch(value) {
    console.log ("Google API puked. " + value) ;
    setGoogleSignInState(GoogleSignInState.CATCH) ;
  }

  React.useEffect(() => {
    gapi.load('auth2', function() {
      gapi.auth2.init(gapiClientConfig)
      .then(onInit, onError)
      .catch(onCatch) ;
    }) ;
// eslint-disable-next-line
  },[gapi]) ;

  if (googleSignInState === GoogleSignInState.INIT) {
    return (
      <div id='GoogleSignInButton'/>
    ) ;
  }

  if (googleSignInState === GoogleSignInState.SUCCESS) {
    return (
      <div>Hello {givenName} {familyName}!!</div>
    ) ;
  }

  return (
    <div>Could not initialize Google Sign In.</div>
  ) ;
}

export default GoogleSignIn;
