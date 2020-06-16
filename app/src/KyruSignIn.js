import React from 'react';
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';

// Kyru Sign In Component

function KyruSignIn(props) {
  const history = useHistory() ;

Amplify.configure({

    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_gaxiIGccJ',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '16l7u0di6lr7f4rg2ap4lhkj6',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: '.kyru.io',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'auth.kyru.io',
        //     scope: ['phone', 'email', 'profile', 'openid'],
        //     redirectSignIn: 'http://auth.kyru.io/login',
        //     redirectSignUp: 'http://auth.kyru.io/login',
        //     redirectSignOut: 'http://kyru.io',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
    }
});

// sign up
async function handleSignUp() {
    try {
        const email = document.getElementById('email').value ;
        const password = document.getElementById('password').value ;
        const user = await Auth.signUp({
            'email': email,
            'password': password,
            attributes: {
                'email': email,          // optional
                // phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log({ user });
    } catch (error) {
        console.log('error signing up: ', error);
    }
}

// sign in
async function handleSignIn() {
    try {
        const email = document.getElementById('email').value ;
        const password = document.getElementById('password').value ;
        const user = await Auth.signIn(email, password);
        console.log({ user });
        history.push("/main") ;
        return null ;
    } catch (error) {
        console.log('error signing in: ', error);
    }
}


  return (
    <div>
      <form id="signin">
        <label>Email address:</label>
        <input type="email" id="email" name="email"></input>
        <br></br>
        <label>Password:</label>
        <input type="password" id="password" name="password"></input>
        <br></br>
        <input type="submit" value="Sign In" onClick={handleSignIn}></input>
        <input type="submit" value="Sign Up" onClick={handleSignUp}></input>
        <input type="submit" value="Forgot password"></input>
      </form>
    </div>
  ) ;
}

export default KyruSignIn;
