import React from 'react';
import GoogleSignIn from './GoogleSignIn';

// enumerator for google load state

const GoogleSignInState = {
  INIT: 0,
  ERROR: 1,
  CATCH: 2,
  SUCCESS: 3
};
Object.freeze(GoogleSignInState);

function Main() {
  const [count, setCount] = React.useState(0) ;
  const [googleSignInState, dispatch] = React.useReducer(reducer, GoogleSignInState.INIT);

  function reducer(state, action) {
    state = action.type ;
  }

  function increaseCount() {
    setCount(count + 1);
  }

  React.useEffect(() => {
    console.log ("Inside useEffect() count " + count) ;
  }, [count, googleSignInState]) ;
/*
      <div>
        if (googleSignInState !== googleSignInState.SUCCESS) {
          <GoogleSignIn onSuccess={() => dispatch({type: GoogleSignInState.SUCCESS})} onFailure={() => dispatch({type: GoogleSignInState.ERROR})}/>
        }
      </div>
*/
  return (
    <div>
      <button onClick={increaseCount}>Count {count}</button>
      <GoogleSignIn onSuccess={() => dispatch({type: GoogleSignInState.SUCCESS})} onFailure={() => dispatch({type: GoogleSignInState.ERROR})}/>
    </div>
  ) ;
}

export default Main;
