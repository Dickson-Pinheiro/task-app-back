import { ErrorResponse } from "../protocols/error.js"

export function badRequestError(message: string): ErrorResponse {
    return {
        name: "badRequestError",
        message
    }
}