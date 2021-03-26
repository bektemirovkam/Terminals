export const USER_ACTION_TYPES = {
  FETCH_USER_DATA: "user/FETCH_USER_DATA",
  FETCH_USER_REGISTER: "user/FETCH_USER_REGISTER",
  CHECK_USER_DATA: "user/CHECK_USER_DATA",
  SET_USER_DATA: "user/SET_USER_DATA",
  SET_LOADING_STATE: "user/SET_LOADING_STATE",
  SET_AUTH_LOADING_STATE: "user/SET_AUTH_LOADING_STATE",
  FETCH_USER_LOGOUT: "user/FETCH_USER_LOGOUT"
};

export const fetchSignIn = (payload) => ({
  type: USER_ACTION_TYPES.FETCH_USER_DATA,
  payload,
});

export const fetchLogout = () => ({
  type: USER_ACTION_TYPES.FETCH_USER_LOGOUT
});

export const fetchRegister = (payload) => ({
  type: USER_ACTION_TYPES.FETCH_USER_REGISTER,
  payload,
});

export const setUserData = (payload) => ({
  type: USER_ACTION_TYPES.SET_USER_DATA,
  payload,
});

export const setUserLoadingState = (payload) => ({
  type: USER_ACTION_TYPES.SET_LOADING_STATE,
  payload,
});
export const setRegisterLoadingState = (payload) => ({
  type: USER_ACTION_TYPES.SET_AUTH_LOADING_STATE,
  payload,
});

export const checkUserData = () => ({
  type: USER_ACTION_TYPES.CHECK_USER_DATA,
});
