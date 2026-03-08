import { call, put, takeLatest } from "redux-saga/effects";
import { APIResponse } from "@/types/apiTypes";
import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    // updateUserRequest,
    // updateUserSuccess,
    // updateUserFailure,
} from "../slices/userSlice";
import { userApi } from "../apis/userApi";
import { FailureResponsePaylod } from "@/types/baseTypes";
import { User } from "@/types/userAndAuthTypes";


function* handleFetchUser(action: ReturnType<typeof fetchUserRequest>) {
    try {

        const response: APIResponse<User> = yield call(userApi.fetchUser);

        yield put(fetchUserSuccess({
            data: response.data,
            message: response.message,
            meta: action.payload.reqMeta,
        }));

    } catch (error: any) {
        const errorPayload: FailureResponsePaylod = {
            status: error?.status,
            message: error?.message ?? "Fetch user failed",
            errors: error?.errors,
            meta: action.payload.reqMeta,
        };

        yield put(fetchUserFailure(errorPayload));
    }
}


// function* handleUpdateUser(action: ReturnType<typeof updateUserRequest>) {
//     try {
//         const response: APIResponse<User> = yield call(
//             userApi.updateUser,
//             action.payload.user
//         );

//         yield put(
//             updateUserSuccess({
//                 data: response.data,
//                 message: response.message,
//                 meta: action.payload.reqMeta,
//             })
//         );
//     } catch (error: any) {
//         const errorPayload: FailureResponsePaylod = {
//             status: error?.status,
//             message: error?.message ?? "Update failed",
//             errors: error?.errors,
//             meta: action.payload.reqMeta,
//         };

//         yield put(updateUserFailure(errorPayload));
//     }
// }

export function* watchUserSaga() {
    yield takeLatest(fetchUserRequest.type, handleFetchUser);
    // yield takeLatest(updateUserRequest.type, handleUpdateUser);
}