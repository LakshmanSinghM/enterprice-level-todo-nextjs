export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface ApiOptions {
    method?: HttpMethod
    headers?: Record<string, string>
    body?: any
    skipAuth?: boolean
    timeout?: number
    retries?: number
    signal?: AbortSignal
}

export interface APIResponse<T> {
    data: T;
    message: string;
    success: boolean;
    errors?: any;
    code?: string;
    pagination?: Pagination;
}

export interface Pagination{

}