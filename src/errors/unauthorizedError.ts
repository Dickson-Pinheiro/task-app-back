import { ErrorResponse } from "../protocols/error.js"

export function unauthorizedError(message: string): ErrorResponse {
    return {
        name: "unauthorizedError",
        message
    }
}