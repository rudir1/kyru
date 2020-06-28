import Recoil from 'recoil';

// is authenticated ?
// during signup the cognitor user may be valid
// but the user is not authenticated
export const isAuthenticatedValue = Recoil.atom({
  key: 'isAuthenticatedValue',
  default: false,
});

// cognito user
// this is separate as the cognitor user may be valid on sign up
// but user is not confirmed yet and so they are not authenticated
export const userValue = Recoil.atom({
  key: 'userValue',
  default: {},
});
