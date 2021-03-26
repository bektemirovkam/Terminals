import { all } from "redux-saga/effects";
import { terminalsSaga } from "../store/ducks/terminals/saga";
import { userSaga } from "../store/ducks/user/saga";

export default function* rootSaga() {
  yield all([terminalsSaga(), userSaga()]);
}
