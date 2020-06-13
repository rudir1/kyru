import React from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  function handleGoogleSignInButtonClick () {
    history.push("/google-signin") ;
  }

  function handleRachioSignInButtonClick () {
    history.push("/rachio-signin") ;
  }

  function handleWirelessTagSignInButtonClick () {
    history.push("/wirelesstag-signin") ;
  }

  return (
    <div>
      <button onClick={handleGoogleSignInButtonClick}>Google Sign In</button>
      <button onClick={handleRachioSignInButtonClick}>Rachio Sign In</button>
      <button onClick={handleWirelessTagSignInButtonClick}>Wireless Tag Sign In</button>
    </div>
  );
}

export default Login;
