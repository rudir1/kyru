import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import * as serviceWorker from './serviceWorker';
import { KyruState } from './kyru-auth';

// enable logger
// Amplify.Logger.LOG_LEVEL = 'VERBOSE';

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'us-west-2:0af4dcbd-bd92-4252-8dfc-9ca122116882',

        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_iCVncFwR0',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '2ojubhh6en5sl3d6fu283uqnq3',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.kyru.io',
        // OPTIONAL - Cookie path
        //     path: '/',
        // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'auth.kyru.io',
        //     scope: ['email', 'profile', 'openid'],
        //     redirectSignIn: 'https://auth.kyru.io/login',
        //     redirectSignOut: 'https://auth.kyru.io/logout',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        //}
    }
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <KyruState/>
      <App/>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
