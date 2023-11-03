import supertest from 'supertest'
import {app} from '../src/app.js'

const api = supertest(app)

describe("GET /", () => {
    it("Deve responder com status 200", async () => {
        const response = await api.get('/')
        expect(response.status).toBe(200);
    })
})