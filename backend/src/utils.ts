export type ResponseError = {
    errorMessage: string,
    location: string
} | null

export type SuccessResponse = any | null | "ok"

export type MyResponse = {
    data: SuccessResponse,
    error: ResponseError
}