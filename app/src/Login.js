import React from 'react';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';

function Login() {
  const history = useHistory();
/*
  function handleResponse(response) {
    console.log("data: " + response.data);
    console.log("status: " + response.status);
    console.log("text: " + response.statusText);
    console.log("headers:" + response.headers);
    console.log("config:" + response.config);
  }

  function handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
*/
  function handleKyruSignInButtonClick() {
    history.push("/kyru-signin") ;
  }

  function handleRachioSignInButtonClick () {
    history.push("/rachio-signin") ;
  }

  function handleWirelessTagSignInButtonClick () {
    history.push("/wirelesstag-signin") ;
  }

  return (
    <div>
      <button onClick={handleKyruSignInButtonClick}>Kyru Sign In</button>
      <button onClick={handleRachioSignInButtonClick}>Rachio Sign In</button>
      <button onClick={handleWirelessTagSignInButtonClick}>Wireless Tag Sign In</button>
    </div>
  );
}

export default Login;
