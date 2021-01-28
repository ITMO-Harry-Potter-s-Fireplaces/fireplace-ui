// USERS
export const loginUser = () => `${process.env.REACT_APP_APISERVER}/auth/login`;
export const registerUser = () => `${process.env.REACT_APP_APISERVER}/auth/register`;
export const getUser = () => `${process.env.REACT_APP_APISERVER}/users/current`;
export const deleteUser = userId => `${process.env.REACT_APP_APISERVER}/users/${userId}`;
export const getAllUsers = () => `${process.env.REACT_APP_APISERVER}/users`;

// FIREPLACES
export const getFireplaces = () => `${process.env.REACT_APP_APISERVER}/fireplaces`;
export const createFireplace = () => `${process.env.REACT_APP_APISERVER}/fireplaces`;
export const deleteFireplace = fireplaceId =>
  `${process.env.REACT_APP_APISERVER}/fireplaces/${fireplaceId}`;

// CLAIMS
export const getClaimById = id => `${process.env.REACT_APP_APISERVER}/claims/${id}`;
export const getCurrentClaims = () => `${process.env.REACT_APP_APISERVER}/claims/current`;
export const getAllClaims = () => `${process.env.REACT_APP_APISERVER}/claims`;
export const createClaim = () => `${process.env.REACT_APP_APISERVER}/claims`;
export const approveClaim = (claimId, approve) =>
  `${process.env.REACT_APP_APISERVER}/claims/${claimId}?approve=${approve}`;
export const cancelClaim = (claimId, cancel) =>
  `${process.env.REACT_APP_APISERVER}/claims/${claimId}?cancel=${cancel}`;
