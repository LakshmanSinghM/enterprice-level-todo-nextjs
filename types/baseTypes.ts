// export interface APIResponse<T> {
//   success: boolean;
//   message?: string;
//   data: T;
//   pagination?: PaginationResponse;
//   errors?: Record<string, string[] | string>;
// }

// export interface PaginationResponse {
//   page?: number;
//   page_size?: number;
//   first?: boolean;
//   last?: boolean;
//   total?: number;
// }

export interface Option {
    value: string;
    label: string;
}


export type TimeStamp = {
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string | null
    updatedBy?: string | null
}

export interface StatusAndDelete {
    isDeleted?: boolean
    isActive?: boolean
}

export interface BaseEntityField {
    id: string;
}

export type DateRange = {
    from: Date | undefined
    to: Date | undefined
}



export interface Option {
    value: string;
    label: string;
}

export type SuccessResponsePaylod<T> = {
    data: T;
    meta?: Record<string, string>;
    message?: string;
}

export type FailureResponsePaylod = {
    meta?: Record<string, string>;
    message?: string;
    errors?: Record<string, any>;
    status?: number;
}