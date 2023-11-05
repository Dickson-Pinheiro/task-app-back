import express from "express"
import cors from 'cors'
import { routes } from "./routes/index.js"
import { handleApplicationErrors } from "./middlewares/handleApplicationError.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(handleApplicationErrors)
export {app}