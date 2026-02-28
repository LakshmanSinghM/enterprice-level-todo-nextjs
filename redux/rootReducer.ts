import { combineReducers } from '@reduxjs/toolkit';
import appReducer from "@/redux/slices/appSlice";
import authReducer from "@/redux/slices/authSlice";


export const appReducers = combineReducers({
    app: appReducer,
    auth: authReducer
})

export const rootReducer = (state: ReturnType<typeof appReducers> | undefined, action: any) => {
    if (action.type === "app/resetApp") {
        state = undefined; // full reset
    }
    return appReducers(state, action);
};