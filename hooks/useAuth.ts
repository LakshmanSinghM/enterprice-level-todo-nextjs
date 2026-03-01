"use client"

import { useEffect } from "react" 
import { useAppDispatch } from "@/redux/hooks"
import { useAuthSelector } from "@/hooks/sliceGeneralHooks"
import { useToast } from "@/hooks/useToast"

import {
    registerRequest,
    googleAuthRequest,
    resetAuthMessageError,
} from "@/redux/slices/authSlice"

import {
    UserAuthRequestPayload,
    UserGoogleAuthRequestPayload,
} from "@/types/userAndAuthTypes"

export function useAuth() { 
    const dispatch = useAppDispatch()
    const { authLoading, authError, authMessage, loggedIn, reqMeta, errors, } = useAuthSelector()

    //  REGISTER 
    const register = (payload: UserAuthRequestPayload) => {
        dispatch(registerRequest(payload))
    }

    //  GOOGLE LOGIN
    const googleLogin = (payload: UserGoogleAuthRequestPayload) => {
        dispatch(googleAuthRequest(payload))
    }

    //  EFFECT HANDLING 
    useEffect(() => {
        if (authMessage && loggedIn) {
            useToast(authMessage, { type: "success" })
            dispatch(resetAuthMessageError())
        }
        if (authError) {
            useToast(authError, { type: "error" })
            dispatch(resetAuthMessageError())
        }
    }, [authError, authMessage])

    return {
        // state
        authLoading,
        authError,
        errors,
        loggedIn,
        
        // actions
        register,
        googleLogin,
    }
}