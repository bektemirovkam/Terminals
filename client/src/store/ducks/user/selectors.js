export const selectUserState = (state) => state.user;

export const selectUserData = (state) => selectUserState(state).data;

export const selectIsAuth = (state) => !!selectUserData(state);
export const selectIsAdmin = (state) => selectUserData(state).isAdmin;
export const selectCanEdit = (state) => selectUserData(state).canEdit;

export const selectLoadingUserState = (state) =>
  selectUserState(state).loadingStatus;

export const selectRegisterLoadingState = (state) =>
  selectUserState(state).registerLoadingStatus;
