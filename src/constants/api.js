export const loginUser = () => `${process.env.REACT_APP_APISERVER}/security/auth/login`;
export const registerUser = () => `${process.env.REACT_APP_APISERVER}/security/auth/register`;
export const getUser = () => `${process.env.REACT_APP_APISERVER}/security/users/current`;
export const getAllUsers = () => `${process.env.REACT_APP_APISERVER}/security/users`;
export const getFireplaces = () => `${process.env.REACT_APP_APISERVER}/main/fireplaces`;
export const getCurrentClaims = () => `${process.env.REACT_APP_APISERVER}/main/claims/current`;
