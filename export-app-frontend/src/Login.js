import React from 'react';
import firebase from 'firebase/app';
import { StyledFirebaseAuth } from 'react-firebaseui';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in
    signInSuccessWithAuthResult: () => false,
  },
};

const Login = ({ firebaseInstance }) => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebaseInstance.auth}
  />
);

export default Login;
