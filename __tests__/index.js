const server = require('../api/server')
const db = require('../database/dbConfig')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('users integration tests', () => {
    test('POST register', async () => {
        const res = await supertest(server).post('/api/auth/register').send({
            username: 'will',
            password: '123'
        })
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('success')
    })

    test('POST register fail', async () => {
        const res = await supertest(server).post('/api/auth/register').send({
            username: 'will'
        })
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('must have username and password')
    })

    test('POST login', async () => {
        const res = await supertest(server).post('/api/auth/login').send({
            username: 'william',
            password: '123'
        })
        
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('welcome william')
    })

    test('POST login fail', async () => {
        const res = await supertest(server).post('/api/auth/login').send({
            username: 'william',
            password: '321'
        })
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('invalid credentials')
    })
})

describe('users integration tests', () => {

    test('GET jokes returned if logged in with correct user', async () => {
        const res = await supertest(server).get('/api/jokes')
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('invalid credentials')
    })
})

