export const LOADING_STATUSES = {
  NEVER: "NEVER",
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS" 
};

export const selectTerminalsState = (state) => state.terminals;
export const selectTerminalsItem = (state) => selectTerminalsState(state).items;
export const selectTerminalsLoadingStatus = (state) =>
  selectTerminalsState(state).loadingStatus;
export const selectAddTerminalStatus = (state) =>
  selectTerminalsState(state).statusAddTerminal;

export const selectTerminalsIsLoading = (state) =>
  selectTerminalsLoadingStatus(state) === LOADING_STATUSES.LOADING;
