import express from "express"
import { routes } from "./routes/index.js"
import { handleApplicationErrors } from "./middlewares/handleApplicationError.js"

const app = express()
app.use(express.json())
app.use(routes)
app.use(handleApplicationErrors)
export {app}