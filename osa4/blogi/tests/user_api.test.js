const { test, describe, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('users api tests', () => {
    let TOKEN = ''

    // Before each test, empty TEST user collection, create 2 test users and log first one in 
    beforeEach(async () => {
        const examples = [
            {
                "username": "TestUser-1",
                "name": "Jesse",
                "password": "salasana123"
            },
            {
                "username": "TestUser-2",
                "name": "Kille",
                "password": "kissa35"
            }
        ]

        await User.deleteMany({ })

        await api.post('/api/users')
            .send(examples[0])

        await api.post('/api/users')
            .send(examples[1])

        const response = await api.post('/api/login')
            .send({
                username: "TestUser-1",
                password: "salasana123"
            })
        TOKEN = response.body.token
    })
    
    test('beforeEach works and 2 sample users exist and data is returned as json', async () => {
        const result = await api.get('/api/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        assert.strictEqual(result.body.length, 2)
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
            .set('Authorization', `Bearer ${TOKEN}`)
    
        assert.strictEqual(result.body.length, 2 + 1)
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
        console.log('Connection to MongoDB closed')
    })
})
