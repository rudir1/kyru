import React from 'react';

// Kyru Sign In Component

function KyruSignIn(props) {
  React.useEffect(() => {
    if (!props.authorized) {
      let client_id = '16l7u0di6lr7f4rg2ap4lhkj6';
      let url = new URL('https://auth.kyru.io/oauth2/authorize');
      url.searchParams.set('scope', 'email profile openid');
      url.searchParams.set('response_type', 'token');
      url.searchParams.set('state', 'random_value_here');
      url.searchParams.set('redirect_uri', 'https://www.kyru.io/oauth2/kyru');
      url.searchParams.set('client_id', client_id);
    
      console.log("Signing in to kyru");
      console.log(url);

      window.location.assign(url) ;
    }

    return null ;
  }, [props]);

  return (<div></div>) ;
}

export default KyruSignIn;
