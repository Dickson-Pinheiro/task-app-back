import { Request, Response, Router } from "express";
const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.send({ok: "ok"})
})

export { routes }