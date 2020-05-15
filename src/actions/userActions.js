export const USER_DELETE = 'user_delete';
export const USER_ADD = 'user_add';

export const add = user => {
  return {
    type: USER_ADD,
    payload: user
  };
};

export const del = () => {
  return {
    type: USER_DELETE
  };
};
