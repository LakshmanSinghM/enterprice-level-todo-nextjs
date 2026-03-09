import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/userAndAuthTypes";
import { FailureResponsePaylod, SimpleRequestWithMeta, SuccessResponsePaylod } from "@/types/baseTypes";
import { registerSuccess } from "./authSlice";


interface UserState {
    user: User | null;
    userLoading: boolean;
    userError: string | null;
    userMessage: string | null;
    reqMeta?: Record<string, string>;
    errors?: Record<string, string>;
}

const initialState: UserState = {
    user: null,
    userLoading: false,
    userError: null,
    userMessage: null,
    reqMeta: undefined,
    errors: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserMessageError(state) {
            state.userMessage = null;
            state.userError = null;
            state.reqMeta = undefined;
            state.errors = undefined;
        },

        fetchUserRequest(state, action: PayloadAction<SimpleRequestWithMeta>) {
            state.userLoading = true;
            state.userError = null;
            state.reqMeta = action.payload.reqMeta;
            state.errors = undefined;
        },

        fetchUserSuccess(state, action: PayloadAction<SuccessResponsePaylod<User>>) {
            state.userLoading = false;
            state.user = action.payload.data ?? null;
            state.userMessage = action.payload.message ?? null;
            state.reqMeta = action.payload.meta;
        },

        fetchUserFailure(state, action: PayloadAction<FailureResponsePaylod>) {
            state.userLoading = false;
            state.userError = action.payload.message ?? null;
            state.reqMeta = action.payload.meta;
            state.errors = action.payload.errors;
        },


        // updateUserRequest(state, action: PayloadAction<{ user: Partial<User>; reqMeta?: Record<string, string> }>) {
        //     state.userLoading = true;
        //     state.userError = null;
        //     state.reqMeta = action.payload.reqMeta;
        //     state.errors = undefined;
        // },

        // updateUserSuccess(state, action: PayloadAction<UserSuccessResponsePayload>) {
        //     state.userLoading = false;
        //     state.user = action.payload.data ?? state.user;
        //     state.userMessage = action.payload.message ?? null;
        //     state.reqMeta = action.payload.meta;
        // },

        // updateUserFailure(state, action: PayloadAction<FailureResponsePaylod>) {
        //     state.userLoading = false;
        //     state.userError = action.payload.message ?? null;
        //     state.reqMeta = action.payload.meta;
        //     state.errors = action.payload.errors;
        // },
    },

    extraReducers: (builder) => {
        builder.addCase(registerSuccess, (state, action) => {
            state.user = action.payload.data?.user ?? null;
            state.userLoading = false;
        });

        // // When logout happens → clear user
        // builder.addCase(logout, (state) => {
        //     state.user = null;
        //     state.userLoading = false;
        //     state.userError = null;
        //     state.userMessage = null;
        // });

        // // Global failure matcher (same pattern style)
        // builder.addMatcher(
        //     (action) => action.type.endsWith("Failure"),
        //     (state) => {
        //         state.userLoading = false;
        //     }
        // );
    },
});

export const {
    resetUserMessageError,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    // updateUserRequest,
    // updateUserSuccess,
    // updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;