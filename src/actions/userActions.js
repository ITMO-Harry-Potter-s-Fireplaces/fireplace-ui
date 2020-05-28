export const USER_DELETE = 'user_delete';
export const SHOW_MODAL = 'show_modal';
export const HIDE_MODAL = 'hide_modal';
export const USER_ADD = 'user_add';

export const add = user => {
  return {
    type: USER_ADD,
    payload: user
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
    payload: true
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
    payload: false
  };
};

export const del = () => {
  return {
    type: USER_DELETE
  };
};
