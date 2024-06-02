const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const examples = [
    {
        "username": "TestUser1",
        "name": "Jesse",
        "password": "salasana123"
    },
    {
        "username": "TestUser2",
        "name": "Kille",
        "password": "kissa35"
    }
]

describe('users api tests', () => {

    beforeEach(async () => {
        await User.deleteMany({ })
    
        await api.post('/api/users')
            .send(examples[0])
    
        await api.post('/api/users')
            .send(examples[1])
    })
    
    test('beforeEach works and 2 sample users exist and data is returned as json', async () => {
        const result = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        assert.strictEqual(result.body.length, examples.length)
    })
    
    test('succesfully creating user returns 201 and amount of users increases by 1', async () => {
        await api.post('/api/users')
            .send({
                "username" : "TestiKäyttäjä69",
                "name" : "Juge",
                "password" : "Koira"
            })
            .expect(201)
        
        const result = await api.get('/api/users')
    
        assert.strictEqual(result.body.length, examples.length + 1)
    })
    
    test('too short username or password returns 400 and proper errormessage', async () => {
        let response = await api.post('/api/users')
            .send({
                "username" : "Te",
                "name" : "Juge",
                "password" : "Koira"
            })
            .expect(400)
            
        assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` (`Te`) is shorter than the minimum allowed length (3).')
    
        response = await api.post('/api/users')
            .send({
                "username" : "TeppoTheBest",
                "name" : "Juge",
                "password" : "Ko"     
            })
            .expect(400)
    
        assert.strictEqual(response.body.error, 'Password required and must be longer than 3 characters')
    })
    
    test('totally missing username or password returns 400 and proper errormesage', async () => {
        let response = await api.post('/api/users')
            .send({
                "name" : "Juge",
                "password" : "Koira"
            })
            .expect(400)
        
        assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` is required.')
    
        response = await api.post('/api/users')
            .send({
                "username" : "TeppoTheBest",
                "name" : "Juge"
            })
            .expect(400)
    
        assert.strictEqual(response.body.error, 'Password required and must be longer than 3 characters')
    })
    
    test('trying to create user with existing username returns 400 and proper errormessage', async () => {
        await api.post('/api/users')
            .send({
                "username" : "TestiKäyttäjä69",
                "name" : "Juge",
                "password" : "Koira"
            })
        
        const response = await api.post('/api/users')
            .send({
                "username" : "TestiKäyttäjä69",
                "name" : "Juge",
                "password" : "Koira"
            })
            .expect(400)
    
        assert.strictEqual(response.body.error, 'expected `username` to be unique')
    })
    
    after(async () => {
        await mongoose.connection.close()
    })
})
