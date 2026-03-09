"use client"

import { useUserSelector } from "@/hooks/sliceGeneralHooks"
import { useToast } from "@/hooks/useToast"
import { useAppDispatch } from "@/redux/hooks"
import { useEffect } from "react"


import { fetchUserRequest, resetUserMessageError } from "@/redux/slices/userSlice" 

export function useCurrentUser() {
    const dispatch = useAppDispatch()
    const { userLoading, userError, userMessage, reqMeta, errors, user } = useUserSelector();


    //  REGISTER 
    const fetchCurrentUserData = () => {
        if (!user) {
            dispatch(fetchUserRequest({
                reqMeta: { "current-user": "fetch" }
            }));
        }
    }

    //  EFFECT HANDLING 
    useEffect(() => {
        if (userMessage) {
            // useToast(userMessage, { type: "success" })
            dispatch(resetUserMessageError())
        }
        if (userError) {
            // useToast(userError, { type: "error" })
            dispatch(resetUserMessageError())
        }
    }, [userMessage, userError])

    return {
        // state
        userLoading,
        userError,
        errors,
        userMessage,
        user,

        // actions
        fetchCurrentUserData
    }
}