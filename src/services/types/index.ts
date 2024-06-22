export interface SuccessResponse<T> {
    statusCode: number
    status: 'SUCCESS'
    result: T
}

export interface ErrorResponse {
    statusCode: number
    status: 'ERROR'
    message: string
}
