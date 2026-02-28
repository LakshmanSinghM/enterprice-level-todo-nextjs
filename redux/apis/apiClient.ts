import { ApiOptions, APIResponse } from "@/types/apiTypes";
import { clearBothToken, getToken } from "@/utils/storage/storageHelper";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

// Timeout wrapper
const fetchWithTimeout = async (resource: string, options: RequestInit, timeout = 10000) => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(resource, { ...options, signal: controller.signal, })
    clearTimeout(id)
    return response
}


//  Refresh Token Handler
const refreshToken = async (): Promise<string | null> => {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, { method: "POST", credentials: "include", })
        if (!res.ok) return null
        const data = await res.json()
        // tokenService.set(data.accessToken)
        return data.accessToken
    } catch {
        return null
    }
}

//  Core API Functiond
export const apiCall = async <T>(
    path: string,
    {
        method = "GET",
        headers = {},
        body,
        skipAuth = false,
        timeout = 10000,
        retries = 1,
        signal,
    }: ApiOptions = {}): Promise<APIResponse<T>> => {

    const url = `${API_BASE_URL}${path}`

    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
    }

    if (!skipAuth && getToken()) {
        defaultHeaders.Authorization = `Bearer ${getToken()}`
    }

    const requestOptions: RequestInit = {
        method,
        headers: { ...defaultHeaders, ...headers },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
        signal,
    }

    try {
        const response = await fetchWithTimeout(url, requestOptions, timeout)
        // Handle 401
        if (response.status === 401 && !skipAuth) {
            const newToken = await refreshToken()

            if (newToken) {
                requestOptions.headers = {
                    ...requestOptions.headers,
                    Authorization: `Bearer ${newToken}`,
                }

                const retryResponse = await fetch(url, requestOptions)
                return await handleResponse<T>(retryResponse)
            } else {
                clearBothToken();
                if (typeof window !== "undefined") {
                    window.location.href = "/login"
                }
                throw new Error("Session or token expired")
            }
        }

        return await handleResponse<T>(response)

    } catch (error: any) {
        // Retry on network failure
        if (retries > 0 && error.name !== "AbortError") {
            return apiCall<T>(path, {
                method,
                headers,
                body,
                skipAuth,
                timeout,
                retries: retries - 1,
            })
        }

        if (error.name === "AbortError") {
            throw new Error("Request timed out")
        }

        throw normalizeError(error)
    }
}

//  Normalize API Errors

const handleResponse = async <T>(response: Response): Promise<APIResponse<T>> => {

    if (!response.ok) {
        const errorBody = await safeJson(response)

        switch (response.status) {
            case 400:
                throw errorBody
            case 403:
                throw new Error("Forbidden")
            case 404:
                throw new Error("Resource not found")
            case 429:
                throw new Error("Too many requests")
            case 500:
                throw new Error("Internal server error")
            default:
                throw new Error(errorBody?.message || "Something went wrong")
        }
    }

    if (response.status === 204) {
        return {
            success: true,
            message: "Operation completed successfully",
            data: undefined as unknown as T,
        }
    }

    return (await response.json()) as APIResponse<T>
}

const safeJson = async (response: Response) => {
    try {
        return await response.json()
    } catch {
        return null
    }
}

const normalizeError = (error: any) => {
    if (error instanceof Error) return error
    return new Error(error?.message || "Unexpected error occurred")
}