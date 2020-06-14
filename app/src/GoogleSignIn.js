import React from 'react';
// import ReactDOM from 'react-dom';
// import { useHistory } from "react-router-dom";

// Google Sign In Component

function GoogleSignIn(props) {
  // const externalWindow = React.useRef(null) ;

  React.useEffect(() => {
    if (props.show) {
      let client_id = '1086335094551-irvr0dt2o3ra6r4vtpj27e9ul5qtre97.apps.googleusercontent.com';
      let url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      url.searchParams.set('scope', 'email profile openid');
      url.searchParams.set('response_type', 'token');
      url.searchParams.set('state', 'random_value_here');
      url.searchParams.set('redirect_uri', 'https://www.kyru.io/oauth2/google');
      url.searchParams.set('client_id', client_id);
    
      console.log("Signing in to google");
      console.log(url);

      // externalWindow.current = window.open(url, '', 'width=600,height=400,left=200,top=200');
      window.location.assign(url) ;
    }

    return null ;
  }, [props]);
/*
  if (! props.authorized) {
  
    window.location.href = path ;
  }
*/
  return (<div></div>) ;
}

export default GoogleSignIn;
