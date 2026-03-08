// apis/userApi.ts
import { APIResponse } from "@/types/apiTypes";
import { apiCall } from "./apiClient";
import { User } from "@/types/userAndAuthTypes";

export const userApi = {
    fetchUser: async (): Promise<APIResponse<User>> => {
        return apiCall<User>(
            "/api/v1/users/me",
            {
                method: "GET",
            }
        );
    },

    // updateUser: async (user: Partial<User>): Promise<APIResponse<User>> => {
    //     return apiCall<User>(
    //         "/api/v1/users",
    //         {
    //             method: "PUT",
    //             body: user,
    //         }
    //     );
    // },
};