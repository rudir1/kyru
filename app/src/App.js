import React from 'react';
import Login from './Login';
import Main from './Main';
import KyruSignIn from './KyruSignIn';
import RachioSignIn from './RachioSignIn';
import WirelessTagSignIn from './WirelessTagSignIn';
import { Switch, Route } from "react-router-dom";

import './App.css';

function App() {
  const [kyruAuthorized, setKyruAuthorized] = React.useState(false) ;
  const [rachioAuthorized, setRachioAuthorized] = React.useState(false) ;
  const [wirelessTagAuthorized, setWirelessTagAuthorized] = React.useState(false) ;
  // const history = useHistory() ;

  function KyruOAuth2Response () {
    console.log ("Kyru authentication successfull.") ;
    setKyruAuthorized(true);
    return (<div></div>);
  }

  function RachioOAuth2Response () {
    console.log ("Rachio authentication successfull.") ;
    setRachioAuthorized(true);
    return (<div></div>);
  }

  function WirelessTagOAuth2Response () {
    console.log ("Wireless Tag authentication successfull.") ;
    setWirelessTagAuthorized(true);
    return (<div></div>);
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/oauth2/kyru">
          <KyruOAuth2Response/>
        </Route>
        <Route path="/oauth2/rachio">
          <RachioOAuth2Response/>
        </Route>
        <Route path="/oauth2/wirelesstag">
          <WirelessTagOAuth2Response/>
        </Route>
        <Route path="/kyru-signin">
          <KyruSignIn authorized={kyruAuthorized}/>
        </Route>
        <Route path="/rachio-signin" authorized={rachioAuthorized}>
          <RachioSignIn/>
        </Route>
        <Route path="/wirelesstag-signin">
          <WirelessTagSignIn authorized={wirelessTagAuthorized}/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/main">
          <Main/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
