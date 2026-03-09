import { all, call } from "redux-saga/effects";
import { watchAuthSaga } from "./sagas/authSaga";
import { watchUserSaga } from "./sagas/userSaga";

export default function* rootSaga() {
    yield all([
        call(watchAuthSaga),
        call(watchUserSaga),
    ]);
}