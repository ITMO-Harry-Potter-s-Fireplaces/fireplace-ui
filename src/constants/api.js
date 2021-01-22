// USERS
export const loginUser = () => `${process.env.REACT_APP_APISERVER}/security/auth/login`;
export const registerUser = () => `${process.env.REACT_APP_APISERVER}/security/auth/register`;
export const getUser = () => `${process.env.REACT_APP_APISERVER}/security/users/current`;
export const deleteUser = userId => `${process.env.REACT_APP_APISERVER}/security/users/${userId}`;
export const getAllUsers = () => `${process.env.REACT_APP_APISERVER}/security/users`;

// FIREPLACES
export const getFireplaces = () => `${process.env.REACT_APP_APISERVER}/main/fireplaces`;
export const createFireplace = () => `${process.env.REACT_APP_APISERVER}/main/fireplaces`;
export const deleteFireplace = fireplaceId =>
  `${process.env.REACT_APP_APISERVER}/main/fireplaces/${fireplaceId}`;

// CLAIMS
export const getCurrentClaims = () => `${process.env.REACT_APP_APISERVER}/main/claims/current`;
export const getAllClaims = () => `${process.env.REACT_APP_APISERVER}/main/claims`;
export const createClaim = () => `${process.env.REACT_APP_APISERVER}/main/claims`;
export const approveClaim = (claimId, approve) =>
  `${process.env.REACT_APP_APISERVER}/main/claims/${claimId}?approve=${approve}`;
export const cancelClaim = (claimId, cancel) =>
  `${process.env.REACT_APP_APISERVER}/main/claims/${claimId}?cancel=${cancel}`;
