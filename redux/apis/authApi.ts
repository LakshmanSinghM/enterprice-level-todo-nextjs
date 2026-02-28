import { APIResponse } from "@/types/apiTypes";
import { apiCall } from "./apiClient";
import { SimpleAuthRequest, UserAuthReponse, UserAuthRequestPayload } from "@/types/userAndAuthTypes";

export const authApi = {
    registerUser: async (authRequest: SimpleAuthRequest): Promise<APIResponse<UserAuthReponse>> => {
        return apiCall<UserAuthReponse>(
            "/api/v1/auth/register",
            {
                method: "POST",
                body: authRequest

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