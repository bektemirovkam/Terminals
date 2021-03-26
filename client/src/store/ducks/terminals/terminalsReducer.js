import produce from "immer";
import { TERMINALS_ACTION_TYPES } from './actionCreators';

export const LOADING_STATUSES = {
  NEVER: "NEVER",
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS" 
};


const initialTerminalsState = {
  items: [],
  loadingStatus: LOADING_STATUSES.NEVER,
  statusAddTerminal: LOADING_STATUSES.NEVER
};

export const terminalsReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case TERMINALS_ACTION_TYPES.SET_TERMINALS:
        draft.items = action.payload;
        draft.loadingStatus = LOADING_STATUSES.LOADED;
        break;
      case TERMINALS_ACTION_TYPES.FETCH_TERMINALS:
        draft.items = [];
        draft.loadingStatus = LOADING_STATUSES.LOADING;
        break;
      case TERMINALS_ACTION_TYPES.FETCH_REMOVE_TERMINALS: 
        draft.loadingStatus = LOADING_STATUSES.LOADING;
        draft.items = [];
        break;
      case TERMINALS_ACTION_TYPES.FETCH_ADD_NEW_TERMINAL:
        draft.statusAddTerminal = LOADING_STATUSES.LOADING;
        break;
      case TERMINALS_ACTION_TYPES.SET_LOADING_STATUS_ADD_TERMINAL:
        draft.statusAddTerminal = action.payload;
        break;
      case TERMINALS_ACTION_TYPES.SET_NEW_TERMINAL:
        draft.items.push(action.payload);
        draft.statusAddTerminal = LOADING_STATUSES.NEVER;
        break;
      case TERMINALS_ACTION_TYPES.SET_LOADING_STATUS:
        draft.loadingStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialTerminalsState
);
