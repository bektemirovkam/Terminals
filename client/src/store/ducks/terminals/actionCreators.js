export const TERMINALS_ACTION_TYPES = {
  SET_TERMINALS: "terminals/SET_TERMINALS",
  SET_NEW_TERMINAL: "terminals/SET_NEW_TERMINAL",
  FETCH_TERMINALS: "terminals/FETCH_TERMINALS",
  FETCH_ADD_NEW_TERMINAL: "terminals/FETCH_ADD_NEW_TERMINAL",
  FETCH_REMOVE_TERMINALS: "terminals/FETCH_REMOVE_TERMINALS",
  // FETCH_START_SOCKET_LISTENING: "terminals/FETCH_START_SOCKET_LISTENING",
  SET_LOADING_STATUS: "terminals/SET_LOADING_STATUS",
  SET_LOADING_STATUS_ADD_TERMINAL: "terminals/SET_LOADING_STATUS_ADD_TERMINAL",
};



export const setTerminals = (payload) => ({
  type: TERMINALS_ACTION_TYPES.SET_TERMINALS,
  payload,
});

export const setNewTerminal = (payload) => ({
  type: TERMINALS_ACTION_TYPES.SET_NEW_TERMINAL,
  payload,
});

export const fetchAddTerminal = (payload) => ({
  type: TERMINALS_ACTION_TYPES.FETCH_ADD_NEW_TERMINAL,
  payload,
});

export const setLoadingStatus = (payload) => ({
  type: TERMINALS_ACTION_TYPES.SET_LOADING_STATUS,
  payload,
});

export const setLoadingStatusAddTerminal = (payload) => ({
  type: TERMINALS_ACTION_TYPES.SET_LOADING_STATUS_ADD_TERMINAL,
  payload,
});

export const fetchTerminals = (payload) => ({
  type: TERMINALS_ACTION_TYPES.FETCH_TERMINALS,
  payload
});

export const fetchRemoveTerminals = (payload) => ({
  type: TERMINALS_ACTION_TYPES.FETCH_REMOVE_TERMINALS,
  payload 
})
