import produce from "immer";
import { USER_ACTION_TYPES } from "./actionCreators";

export const LOADING_STATUSES = {
  NEVER: "NEVER",
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const initialUserState = {
  data: undefined,
  loadingStatus: LOADING_STATUSES.NEVER,
  registerLoadingStatus: LOADING_STATUSES.NEVER,
};

export const userReducer = produce((draft, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_USER_DATA:
      draft.data = action.payload;
      draft.loadingStatus = LOADING_STATUSES.SUCCESS;
      break;
    case USER_ACTION_TYPES.SET_LOADING_STATE:
      draft.loadingStatus = action.payload;
      break;
    case USER_ACTION_TYPES.FETCH_USER_DATA:
      draft.loadingStatus = LOADING_STATUSES.LOADING;
      break;
    case USER_ACTION_TYPES.SET_AUTH_LOADING_STATE:
      draft.registerLoadingStatus = action.payload;
      break;
    default:
      break;
  }
}, initialUserState);
