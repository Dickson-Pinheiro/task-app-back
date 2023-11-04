import { ErrorResponse } from "../protocols/error.js"

export function notFoundError(message: string): ErrorResponse {
    return {
        name: "notFoundError",
        message
    }
}