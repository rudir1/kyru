import React from 'react';
import KyruSignIn from './KyruSignIn';
import RachioSignIn from './RachioSignIn';
import Main from './Main';
import Recoil from 'recoil';
import { ViewType, viewTypeValue } from './kyru-auth';

import './App.css';

function App() {
  const viewType = Recoil.useRecoilValue(viewTypeValue);

  return (
    <div>
      { (viewType === ViewType.KYRU_SIGN_IN)   ? <KyruSignIn/> :
        (viewType === ViewType.RACHIO_SIGN_IN) ? <RachioSignIn/> :
                                                 <Main/>
      }
    </div>
  );
}

export default App;
