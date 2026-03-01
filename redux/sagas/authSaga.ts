import { call, put, takeLatest } from "redux-saga/effects";
import { APIResponse } from "@/types/apiTypes";
import { googleAuthRequest, registerFailure, registerRequest, registerSuccess } from "../slices/authSlice";
import { authApi } from "../apis/authApi";
import { UserAuthReponse, UserAuthSuccessResponsePaylod } from "@/types/userAndAuthTypes";
import { FailureResponsePaylod } from "@/types/baseTypes";
import { setRefreshToken, setToken } from "@/utils/storage/storageHelper";


function* handleRegister(action: ReturnType<typeof registerRequest>) {

    try {

        const response: APIResponse<UserAuthReponse> = yield call(authApi.registerUser, action.payload.user);
        const payload: UserAuthSuccessResponsePaylod = {
            data: response.data,
            message: response.message,
            meta: action.payload.reqMeta,
        }

        if (response?.data?.accessToken)
            setToken(response?.data?.accessToken)
        if (response?.data?.refreshToken)
            setRefreshToken(response.data.refreshToken)

        yield put(registerSuccess(payload));
    } catch (error: any) {

        const errorPayload: FailureResponsePaylod = {
            status: error?.status,
            message: error?.message ?? "Register failed",
            errors: error?.errors,
            meta: action.payload.reqMeta
        }
        yield put(registerFailure(errorPayload));
    }
}
function* handleGoogleAuth(action: ReturnType<typeof googleAuthRequest>) {

    try {

        const response: APIResponse<UserAuthReponse> = yield call(authApi.googleAuth, action.payload);
        const payload: UserAuthSuccessResponsePaylod = {
            data: response.data,
            message: response.message,
            meta: action.payload.reqMeta,
        }

        if (response?.data?.accessToken)
            setToken(response?.data?.accessToken)
        if (response?.data?.refreshToken)
            setRefreshToken(response.data.refreshToken)

        yield put(registerSuccess(payload));
    } catch (error: any) {

        const errorPayload: FailureResponsePaylod = {
            status: error?.status,
            message: error?.message ?? "Register failed",
            errors: error?.errors,
            meta: action.payload.reqMeta
        }
        yield put(registerFailure(errorPayload));
    }
}

// function* handleLogout(action: ReturnType<typeof logoutRequest>) {
//     try {

//         const response: APIResponse<undefined> = yield call(authApi.logout);
//         yield put(
//             logoutSuccess({
//                 message: response.message,
//                 meta: action.payload.meta,
//             })
//         );
//     } catch (error) {
//         yield put(
//             logoutFailure({
//                 message: (error as Error).message ?? "Logout failed",
//                 meta: action.payload.meta,
//             })
//         );
//     }
// }

export function* watchAuthSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(googleAuthRequest.type, handleGoogleAuth);
    // yield takeLatest(logoutRequest.type, handleLogout);
}