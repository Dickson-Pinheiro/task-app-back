import supertest from 'supertest'
import {app} from '../src/app.js'
import { cleanDb } from './helpers/cleanDb.js'
import { faker } from '@faker-js/faker'

const api = supertest(app)

beforeAll(async () => {
    await cleanDb()
})

afterAll(async () => {
    await cleanDb()
})

afterEach(async () => {
    await cleanDb()
})

describe("POST /auth/signup", () => {
    it("Deve responder com status 201, caso os dados sejam fornecidos corretamente.", async () => {
        const response = await api.post('/auth/signup').send({
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password()
        })
        expect(response.status).toBe(201);
    })
})