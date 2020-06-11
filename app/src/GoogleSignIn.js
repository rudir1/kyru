import React from 'react';

// enumerator for google load state

const SignInState = {
  INIT: 0,
  ERROR: 1,
  CATCH: 2,
  SUCCESS: 3
};
Object.freeze(SignInState);

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
  const [signInState, setSignInState] = React.useState(SignInState.INIT) ;
  const [signInName, setSignInName] = React.useState({givenName: '', familyName: ''}) ;
  const googleAuthRef = React.useRef(null) ;

  function onSignIn(googleUser) {
    let basicProfile = googleUser.getBasicProfile() ;
    setSignInName({givenName: basicProfile.getGivenName(), familyName: basicProfile.getFamilyName()}) ;
    console.log ("Google API sign in success.") ;
    setSignInState(SignInState.SUCCESS) ;
  }

  function onInit(value) {
    let googleAuth = gapi.auth2.getAuthInstance();
    if (googleAuth.isSignedIn.get()) {
      onSignIn(googleAuth.currentUser.get()) ;
    }
    else {
      gapiRenderOptions.onsuccess = onSignIn ;
      gapi.signin2.render('GoogleSignInButton', gapiRenderOptions);
      googleAuthRef.current = gapi.auth2.getAuthInstance();
      console.log ("Google API init success.") ;
      setSignInState(SignInState.INIT) ;
    }
  }

  function onError(value) {
    console.log ("Google API init error. " + value) ;
    setSignInState(SignInState.ERROR) ;
  }

  function onCatch(value) {
    console.log ("Google API puked. " + value) ;
    setSignInState(SignInState.CATCH) ;
  }

  React.useEffect(() => {
    gapi.load('auth2', function() {
      gapi.auth2.init(gapiClientConfig)
      .then(onInit, onError)
      .catch(onCatch) ;
    }) ;
// eslint-disable-next-line
  },[gapi]) ;


    function C() {
            switch(signInState) {
            case SignInState.INIT:
                 return <div id="GoogleSignInButton"></div>
            case SignInState.SUCCESS:
                return <div>Hello {signInName.givenName} {signInName.familyName}!!</div>
            default:
                 return <div>Could not initialize Google Sign In.</div>
            }
    }
  return (
    <div>
        <C />
    </div>
  ) ;
}


export default GoogleSignIn;
