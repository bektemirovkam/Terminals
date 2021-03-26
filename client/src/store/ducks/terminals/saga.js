import { call, put, takeEvery } from "redux-saga/effects";
import { TerminalsApi } from './../../../api/terminalsApi';
import { setLoadingStatus, setTerminals, TERMINALS_ACTION_TYPES, setNewTerminal, setLoadingStatusAddTerminal } from './actionCreators';


export const LOADING_STATUSES = {
  NEVER: "NEVER",
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS" 
};



export function* fetchTerminalsRequest({ payload }) {
  try {
    let terminals;
    if (payload) {
      terminals= yield call(TerminalsApi.fetchSearchTerminal, payload);
    } else {
      terminals= yield call(TerminalsApi.fetchAllTerminals);
    }
    yield put(setTerminals(terminals));
  } catch (error) {
    yield put(setLoadingStatus(LOADING_STATUSES.ERROR));
  }
}

export function* fetchRemoveTerminalsRequest({ payload }) {
  try {
    const terminals = yield call(TerminalsApi.removeTerminals, payload);
    yield put(setTerminals(terminals));
  } catch (error) {
    yield put(setLoadingStatus(LOADING_STATUSES.ERROR));
  }
}

export function* fetchAddTerminalRequest({payload}) {
  try {
    const newTerminal = yield call(TerminalsApi.addTerminal, payload);
    yield put(setNewTerminal(newTerminal));
  } catch (error) {
    console.log(error)
    yield put(setLoadingStatusAddTerminal(LOADING_STATUSES.ERROR));
  }
}

export function* terminalsSaga() {
  yield takeEvery(TERMINALS_ACTION_TYPES.FETCH_TERMINALS, fetchTerminalsRequest);
  yield takeEvery(TERMINALS_ACTION_TYPES.FETCH_REMOVE_TERMINALS, fetchRemoveTerminalsRequest);
  yield takeEvery(TERMINALS_ACTION_TYPES.FETCH_ADD_NEW_TERMINAL, fetchAddTerminalRequest)
}

