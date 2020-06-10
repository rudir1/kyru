import React from 'react';
import GoogleSignIn from './GoogleSignIn';
import './App.css';

// enumerator for current view

const Color = {
   GOOGLESIGNIN: 1,
   RACHIOSIGNIN: 2,
   WIRELESSTAGSIGNIN: 3,
   MAIN: 4
};
Object.freeze(Color);

function Main() {
  const [count, setCount] = React.useState(0) ;

  function increaseCount() {
    setCount(count + 1);
  }

/*
  function onGoogleSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
*/
  React.useEffect(() => {
    console.log ("Inside useEffect() count " + count) ;
  }, [count]) ;

  return (
    <div>
      <button onClick={increaseCount}>Count {count}</button>
      <GoogleSignIn/>
    </div>
  ) ;
}

function App() {
  return (
    <Main />
  );
}

export default App;
