import { APIResponse } from "@/types/apiTypes";
import { apiCall } from "./apiClient";
import { GoogleAuthRequest, SimpleAuthRequest, UserAuthReponse, UserAuthRequestPayload } from "@/types/userAndAuthTypes";

export const authApi = {
    registerUser: async (authRequest: SimpleAuthRequest): Promise<APIResponse<UserAuthReponse>> => {
        return apiCall<UserAuthReponse>(
            "/api/v1/auth/register",
            {
                method: "POST",
                body: authRequest,
                skipAuth: true,
            }
        );
    },
    googleAuth: async (authRequest: GoogleAuthRequest): Promise<APIResponse<UserAuthReponse>> => {
        // continue from here 
        return apiCall<UserAuthReponse>(
            "/api/v1/auth/google",
            {
                method: "POST",
                body: authRequest,
                skipAuth: true,
            }
        );
    },

    // logout: async (): Promise<APIResponse<undefined>> => {
    //     return apiCall<undefined>(
    //         "/api/auth/logout/",
    //         "POST",
    //         {
    //             "Content-Type": "application/json",
    //         }
    //     );
    // },
};