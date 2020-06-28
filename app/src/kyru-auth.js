import Recoil from 'recoil';

// is authenticated ?
// during signup the cognitor user may be valid
// but the user is not authenticated
export const isAuthenticatedValue = Recoil.atom({
  key: 'isAuthenticatedValue',
  default: false,
});

