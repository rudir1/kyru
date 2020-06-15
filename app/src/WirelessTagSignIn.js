import React from 'react';

// Wireless Tag Sign In Component

function WirelessTagSignIn(props) {
  React.useEffect(() => {
    if (!props.authorized) {
      let client_id = '695e6c7f-c20d-427c-9f99-fcd819ab296f';
      let url = new URL('https://www.mytaglist.com/oauth2/authorize.aspx');
      url.searchParams.set('response_type', 'token');
      url.searchParams.set('state', 'random_value_here');
      url.searchParams.set('redirect_uri', 'https://www.kyru.io/oauth2/wirelesstag');
      url.searchParams.set('client_id', client_id);
    
      console.log("Signing in to Wireless Tag");
      console.log(url);

      window.location.assign(url) ;
    }

    return null ;
  }, [props]) ;
}

export default WirelessTagSignIn;
