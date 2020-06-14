import React from 'react';
import Login from './Login';
// import Main from './Main';
import GoogleSignIn from './GoogleSignIn';
import RachioSignIn from './RachioSignIn';
import WirelessTagSignIn from './WirelessTagSignIn';
import { Switch, Route } from "react-router-dom";

import './App.css';

function App() {
  const [googleAuthorized, setGoogleAuthorized] = React.useState(false) ;
  //const [showGoogleSignIn, setShowGoogleSignIn] = React.useState(false) ;

  function GoogleOAuth2Response () {
    console.log ("Google authentication successfull.") ;
    setGoogleAuthorized(true);
    return (<div></div>);
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/oauth2/google">
          <GoogleOAuth2Response/>
        </Route>
        <Route path="/google-signin">
          <GoogleSignIn authorized={false} show={true}/>
        </Route>
        <Route path="/rachio-signin">
          <RachioSignIn/>
        </Route>
        <Route path="/wirelesstag-signin">
          <WirelessTagSignIn/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
