import { StatusAndDelete, SuccessResponsePaylod, TimeStamp } from "./baseTypes"

export interface User extends TimeStamp, StatusAndDelete {
    id: number
    providerType: string | null
    status: string | null
    email: string
    providerId: string | null
    firstName: string | null
    lastName: string | null
}

export type SimpleAuthRequest = {
    email: string;
    password: string;
}

export type UserAuthRequestPayload = {
    user: SimpleAuthRequest;
    reqMeta?: Record<string, string>;
}



export type UserAuthSuccessResponsePaylod = SuccessResponsePaylod<UserAuthReponse>;


export type UserAuthReponse = {
    accessToken?: string;
    refreshToken?: string;
    user: User | null;
}