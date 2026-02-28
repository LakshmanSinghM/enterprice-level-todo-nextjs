import { combineReducers } from '@reduxjs/toolkit';
import appReducer from "@/redux/slices/appSlice"


export const appReducers = combineReducers({
    app: appReducer
})

export const rootReducer = (state: ReturnType<typeof appReducers> | undefined, action: any) => {
    if (action.type === "app/resetApp") {
        state = undefined; // full reset
    }
    return appReducers(state, action);
};