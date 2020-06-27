import Recoil from 'recoil';

export const isAuthenticatedValue = Recoil.atom({
  key: 'isAuthenticatedValue',
  default: false,
});

// function KyruSignIn(props) {
//   const history = useHistory() ;
//   const [input, setInput] = React.useState({
//     email: "",
//     password: ""
//   });
//   const authErrorRef = React.useRef(null) ;
//   
//   // error handler
//   function handleError(error) {
//     authErrorRef.current = JSON.stringify(error);
//     console.log('error: ', authErrorRef.current);
//   }
//  
//   // error handler
//   function handleSuccess(success) {
//     console.log('success: ', JSON.stringify (success));
//     authErrorRef.current = null ;
//     history.replace("/main") ;
//   }
//  
//   // handle sign up success
//   function handleSignUpSuccess(success) {
//     console.log(this.name + ': ', JSON.stringify (success));
//     history.replace("/confirmsignup") ;
//   }
// 
//   // handle sign up error
//   function handleSignUpError(error) {
//     console.log('handleSignUpError: ', JSON.stringify (error));
//   }
// 
//   // sign up
//   function handleSignUp(event) {
//     event.preventDefault();
//     Auth.signUp({
//             'username': input.email,
//             'password': input.password,
//             attributes: {
//                 'email': input.email,          // optional
//             }
//     })
//     .then(handleSignUpSuccess)
//     .catch(handleSignUpError) ;
//   }
// 
//   // refresh the component to request a new password
//   function handleNewPasswordRequired() {
//     history.push("/newpasswordrequired") ;
//   }
// 
//   // complete new password
//   function handleCompleteNewPassword() {
//     const newPassword = document.getElementById('newpassword').value ;
//     Auth.currentAuthenticatedUser()
//     .then (user => Auth.completeNewPassword(user, newPassword))
//     .then(handleSuccess)
//     .catch(handleError) ;
//   }
// 
//   // challenge name successful
//   function handleChallengeNameSuccess(user) {
//     console.log(this.name + ': ', JSON.stringify (user));
//     history.replace('/main');
//   }
// 
//   // implement a challenge
//   function handleChallengeName(user) {
//     if (user.challengeName === 'NEW_PASSWORD_REQUIRED')
//       handleNewPasswordRequired();
//     else
//       handleChallengeNameSuccess(user);
//   }
// 
//   // handle sign in error
//   function handleSignInError(error) {
//     console.log('handleSignInError: ', JSON.stringify (error));
//   }
// 
//   // sign in
//   function handleSignIn(event) {
//     const nativeEvent = event.nativeEvent ;
//     console.log("handleSignIn: " + nativeEvent.submitter.name);
//     event.preventDefault();
// 
//     if (nativeEvent.submitter.name === "signin") {
//     }
//     else if (nativeEvent.submitter.name === "signup") {
//       Auth.signUp({
//         'username': input.email,
//         'password': input.password,
//         attributes: {
//           'email': input.email,          // optional
//         }
//       })
//       .then(handleSignUpSuccess)
//       .catch(handleSignUpError) ;
//     }
//     else if (nativeEvent.submitter.name === "forgotpassword") {
//     }
//   }
// 
//   // change password
//   function handleChangePassword() {
//       const oldPassword = document.getElementById('oldpassword').value ;
//       const newPassword = document.getElementById('newpassword').value ;
//       Auth.currentAuthenticatedUser()
//       .then((user) => { Auth.changePassword(user, oldPassword, newPassword); })
//       .then(handleSuccess)
//       .catch(handleError);
//   }
// 
//   function handleForgotPasswordResponse(response) {
//     history.push('/kyru/forgotpassword') ;
//   }
// 
//   function handleForgotPasswordError(error) {
//     history.replace ('/kyru/signin') ;
//   }
// 
//   // forgot password
//   function handleForgotPassword() {
//     const email = document.getElementById('email').value ;
//     Auth.forgotPassword(email)
//     .then(handleForgotPasswordResponse)
//     .catch(handleForgotPasswordError);
//   }
// 
//   // Collect confirmation code and new password
//   function handleForgotPasswordSubmit(event) {
//     const email = document.getElementById('email').value ;
//     const newPassword = document.getElementById('newpassword').value ;
//     const code = document.getElementById('code').value ;
//     event.preventDefault();
//     Auth.forgotPasswordSubmit(email, code, newPassword)
//     .then(handleSuccess)
//     .catch(handleError);
//   }
// 
//   function handleConfirmSignUpSuccess (success) {
//     console.log(this.name + ': ', JSON.stringify (success));
//     history.push('/main');
//   }
// 
//   function handleConfirmSignUpError (error) {
//     console.log(this.name + ': ', JSON.stringify (error));
//   }
// 
//   // Collect confirmation code to confirm sign up
//   function handleConfirmSignUp(event) {
//     const email = document.getElementById('email').value ;
//     const code = document.getElementById('code').value ;
//     event.preventDefault();
//     Auth.confirmSignUp(email, code)
//     .then(handleConfirmSignUpSuccess)
//     .catch(handleConfirmSignUpError);
//   }
// 
//   function handleInputChange(event) {
//     const target = event.target ;
//     console.log("handleInputChange: " + target.name);
//     setInput({
//       ...input,
//       [target.name]: event.target.value
//     })
//   }
