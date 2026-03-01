import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserAuthRequestPayload, UserAuthSuccessResponsePaylod, UserGoogleAuthRequestPayload } from "@/types/userAndAuthTypes";
import { FailureResponsePaylod } from "@/types/baseTypes";


interface AuthState {
    user: User | null;
    authLoading: boolean;
    authError: string | null;
    authMessage: string | null;
    reqMeta?: Record<string, string>;
    errors?: Record<string, string>;
    loggedIn?: boolean;
}

const initialState: AuthState = {
    user: null,
    authLoading: false,
    authError: null,
    authMessage: null,
    reqMeta: undefined,
    errors: undefined,
    loggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthMessageError(state) {
            state.authMessage = null;
            state.authError = null;
            state.reqMeta = undefined;
            state.errors = undefined;
        },

        registerRequest(state, action: PayloadAction<UserAuthRequestPayload>) {
            console.log("COming time ");
            state.authLoading = true;
            state.authError = null;
            state.reqMeta = action.payload.reqMeta;
            state.errors = undefined;
        },

        googleAuthRequest(state, action: PayloadAction<UserGoogleAuthRequestPayload>) {
            state.authLoading = true;
            state.authError = null;
            state.reqMeta = action.payload.reqMeta;
            state.errors = undefined;
        },

        registerSuccess(state, action: PayloadAction<UserAuthSuccessResponsePaylod>) {
            console.log("Succes are coming in slice " + JSON.stringify(action.payload))
            state.authLoading = false;
            state.user = action.payload.data?.user;
            state.authMessage = action.payload.message ?? null;
            state.reqMeta = action.payload.meta;
            state.loggedIn = true;
        },

        registerFailure(state, action: PayloadAction<FailureResponsePaylod>) {
            console.log("Errors are coming in slice " + JSON.stringify(action.payload))
            state.authLoading = false;
            state.authError = action.payload.message ?? null;
            state.reqMeta = action.payload.meta;
            state.errors = action.payload.errors
        },

        // logoutRequest(state, action: PayloadAction<{ meta?: Record<string, string> }>) {
        //     state.authLoading = true;
        //     state.reqMeta = action.payload.meta;
        // },

        // logoutSuccess(
        //     state,
        //     action: PayloadAction<{ message?: string; meta?: Record<string, string> }>
        // ) {
        //     state.authLoading = false;
        //     state.user = null;
        //     state.accessToken = null;
        //     state.refreshToken = null;
        //     state.authMessage = action.payload.message ?? null;
        //     state.reqMeta = action.payload.meta;
        // },

        // logoutFailure(state, action: PayloadAction<FailureResPayload>) {
        //     state.authLoading = false;
        //     state.authError = action.payload.message;
        //     state.reqMeta = action.payload.meta as Record<string, string>;
        // },
    },
});

export const {
    resetAuthMessageError,
    registerRequest,
    registerSuccess,
    registerFailure,
    googleAuthRequest,
    // logoutRequest,
    // logoutSuccess,
    // logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;