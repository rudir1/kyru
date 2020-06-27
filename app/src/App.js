import React from 'react';
import KyruSignIn from './KyruSignIn';
import Main from './Main';
import Recoil from 'recoil';
import { isAuthenticatedValue } from './kyru-auth';

import './App.css';

function App() {
  const isAuthenticated = Recoil.useRecoilValue(isAuthenticatedValue);

  return (
    <div>
      { isAuthenticated ? <Main /> : <KyruSignIn/> }
    </div>
  );
}

export default App;
