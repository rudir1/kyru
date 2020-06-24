import React from 'react';
import Login from './Login';
import Main from './Main';
import KyruSignIn from './KyruSignIn';
import RachioSignIn from './RachioSignIn';
import WirelessTagSignIn from './WirelessTagSignIn';
import { Switch, Route } from 'react-router-dom';
import Recoil from 'recoil';

import './App.css';

function App() {
  return (
    <div className="AppSwitch">
      <Switch>
        <Route path="/main">
          <Main/>
        </Route>
        <Route path="/">
          <KyruSignIn/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
