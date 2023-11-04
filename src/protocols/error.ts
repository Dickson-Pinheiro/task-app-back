import { ErrorNameOptions } from "../middlewares/handleApplicationError.js"

export type ErrorResponse = {
    name: ErrorNameOptions,
    message: string
}