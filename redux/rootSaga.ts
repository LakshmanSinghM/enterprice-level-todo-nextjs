import { all, call } from "redux-saga/effects";
import { watchAuthSaga } from "./sagas/authSaga";

export default function* rootSaga() {
    yield all([
        call(watchAuthSaga),
    ]);
}