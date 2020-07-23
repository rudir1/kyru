import React from 'react';
import KyruSignIn from './KyruSignIn';
import RachioSignIn from './RachioSignIn';
import Main from './Main';
import Recoil from 'recoil';
import { ViewType, viewTypeAtom } from './KyruState';
import { Auth } from 'aws-amplify';

import './App.css';

function App() {
  const viewType = Recoil.useRecoilValue(viewTypeAtom);
  
  React.useEffect(() => {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
    .catch(err => console.log(err));
  },[]) ;

  return (
    <div>
      { (viewType === ViewType.MAIN)           ? <Main/> :
        (viewType === ViewType.RACHIO_SIGN_IN) ? <RachioSignIn/> :
                                                 <KyruSignIn/>
      }
    </div>
  );
}

export default App;
