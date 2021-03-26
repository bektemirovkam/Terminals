import { call, put, takeEvery } from "redux-saga/effects";
import { setUserData, USER_ACTION_TYPES, setUserLoadingState, setRegisterLoadingState } from './actionCreators';
import { AuthApi } from './../../../api/authApi';

export const LOADING_STATUSES = {
  NEVER: "NEVER",
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS" 
};


export function* fetchSignInRequest({ payload }) {
  try {
    yield put(setUserLoadingState(LOADING_STATUSES.LOADING));
    const data= yield call(AuthApi.login, payload);
    yield put(setUserData(data));
    window.localStorage.setItem("token", data.token);
  } catch (error) {
    yield put(setUserLoadingState(LOADING_STATUSES.ERROR));
  }
}

export function* fetchLogoutRequest() {
  window.localStorage.removeItem("token");
  yield put(setUserData(undefined))
}

export function* fetchRegisterRequest({ payload }) {
  try {
    yield put(setRegisterLoadingState(LOADING_STATUSES.LOADING));
    yield call(AuthApi.register, payload);
    yield put(setRegisterLoadingState(LOADING_STATUSES.SUCCESS));
  } catch (error) {
    yield put(setRegisterLoadingState(LOADING_STATUSES.ERROR));
  }
}

export function* fetchCheckUserDataRequest() {
  try {
    yield put(setUserLoadingState(LOADING_STATUSES.LOADING));
    const data= yield call(AuthApi.getMe);
    yield put(setUserData(data))
    yield put(setUserLoadingState(LOADING_STATUSES.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingState(LOADING_STATUSES.ERROR));
  }
}


export function* userSaga() {
  yield takeEvery(USER_ACTION_TYPES.FETCH_USER_DATA, fetchSignInRequest);
  yield takeEvery(USER_ACTION_TYPES.FETCH_USER_REGISTER, fetchRegisterRequest);
  yield takeEvery(USER_ACTION_TYPES.CHECK_USER_DATA, fetchCheckUserDataRequest);
  yield takeEvery(USER_ACTION_TYPES.FETCH_USER_LOGOUT, fetchLogoutRequest);
}
