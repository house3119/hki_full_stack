const { test, describe, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require ('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('blog api tests', () => {
    let TOKEN = ''

    // Before suite, empty TEST user collection, create test user and log that user in. Save token in TOKEN
    before(async () => {
        await User.deleteMany({ })
        await api.post('/api/users')
            .send({
                username: "TestiAcco1",
                name: "Teppo Testaaja",
                password: "12345"
            })

        const response = await api.post('/api/login')
                            .send({
                                username: "TestiAcco1",
                                password: "12345"
                            })

        TOKEN = response.body.token
    })

    // Before each test, empty TEST blog collection and add 2 test blogs with the created test user
    beforeEach(async () => {
        const examples = [
            {
                "title": "Testi 35",
                "author": "Kille the Pwner",
                "url": "x",
                "likes": 35
            },
            {
                "title": "Testi 69",
                "author": "Jape the Owner",
                "url": "x",
                "likes": 131
            }   
        ]

        await Blog.deleteMany({ })

        await api.post('/api/blogs')
            .send(examples[0])
            .set('Authorization', `Bearer ${TOKEN}`)

        await api.post('/api/blogs')
            .send(examples[1])
            .set('Authorization', `Bearer ${TOKEN}`)
    })

    test('test that 2 blogs returned as json', async () => {
        const response = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, 2)
        assert.strictEqual(true, true)
    })
    
    test('identifying field in returned blog is called "id"', async () => {
        const response = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
        const exampleBlog = response.body[0]
        
        assert.strictEqual(('id' in exampleBlog), true)
        assert.strictEqual(('_id' in exampleBlog), false)
    })
    
    test('adding a new blog works', async () => {
        const newEntry = {   
            "title": "Testi 2000",
            "author": "Marko",
            "url": "www.markonblogi.fi",
            "likes": 1
        }

        await api.post('/api/blogs')
            .send(newEntry)
            .set('Authorization', `Bearer ${TOKEN}`)

        const response = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)

        assert.strictEqual(response.body.length, 3)
        assert.strictEqual(response.body[2].author, 'Marko')
    })
    
    test('when adding a blog without likes key, default to 0', async () => {
        const exampleWithoutLikes = {
            "title": "Taas testi 3535",
            "author": "Jesse James",
            "url": "www.jesse.ai"
        }

        await api.post('/api/blogs')
            .send(exampleWithoutLikes)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)

        const response = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)

        assert.strictEqual(response.body[2].likes, 0)
        assert.strictEqual(response.body.length, 3)
    })
    
    test('if adding blog with no title or url, returns 400', async () => {
        const faultyBlogs = [
            {
                "author": "Jimbo",
                "url": "www.fi"
            },
            {
                "title": "Jambos Blog 1",
                "author": "Jambo"
            },
            {
                "author": "Jube"
            }
        ]

        await api.post('/api/blogs')
            .send(faultyBlogs[0])
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(400)

        await api.post('/api/blogs')
            .send(faultyBlogs[1])
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(400)

        await api.post('/api/blogs')
            .send(faultyBlogs[2])
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(400)

        const result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)

        assert.strictEqual(result.body.length, 2)
    })

    test('trying to add blog without token returns 401', async () => {
        const newEntry = {   
            "title": "Testi 2000",
            "author": "Marko",
            "url": "www.markonblogi.fi",
            "likes": 1
        }

        const result = await api.post('/api/blogs')
            .send(newEntry)
            .expect(401)

        assert.strictEqual(result.body.error, 'invalid or missing token')
    })
    
    test('deleting post returns 200 and blog is actually removed', async () => {
        let result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
        const idOfFirstBlog = result.body[0].id
        await api.delete(`/api/blogs/${idOfFirstBlog}`)
            .expect(204)
            .set('Authorization', `Bearer ${TOKEN}`)

        result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)

        assert.strictEqual(result.body.length, 1)
    })

    test('trying to delete post with invalid id returns 400', async () => {
        await api.delete('/api/blogs/invalidTestId123')
            .expect(400)
            .set('Authorization', `Bearer ${TOKEN}`)
    })

    test('returns 404 when id is valid but blog with that id doesnt exist', async () => {
        let result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
        const idOfFirstBlog = result.body[0].id
        await api.delete(`/api/blogs/${idOfFirstBlog}`)
            .expect(204)
            .set('Authorization', `Bearer ${TOKEN}`)

        await api.delete(`/api/blogs/${idOfFirstBlog}`)
            .expect(404)
            .set('Authorization', `Bearer ${TOKEN}`)
    })

    test('updating only 1 field works', async () => {
        let result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
        const idOfFirstBlog = result.body[0].id
        result = await api.put(`/api/blogs/${idOfFirstBlog}`)
            .send({ 'title' : 'Updated Title 123' })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200)

        assert.strictEqual(result.body.title, 'Updated Title 123')
    })

    test('updating all the fields at the same time works', async () => {
        const updatedInfo = {
            "url": "www.jupe.fi",
            "likes": 9999,
            "title": "Testi 39",
            "author": "Jupe The Best"
        }

        let result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
        const idOfFirstBlog = result.body[0].id
        result = await api.put(`/api/blogs/${idOfFirstBlog}`)
            .send(updatedInfo)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200)

        assert.strictEqual(result.body.url, 'www.jupe.fi')
        assert.strictEqual(result.body.likes, 9999)
        assert.strictEqual(result.body.title, 'Testi 39')
        assert.strictEqual(result.body.author, 'Jupe The Best')
    })

    test('returns 400 if id is not valid id', async () => {
        await api.put('/api/blogs/123invalidId123')
            .send({ 'title' : 'Updated Title 123' })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(400)
    })

    test('returns 404 if id is valid, but no blog with that id is found', async () => {
        const result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
        const idOfFirstBlog = result.body[0].id

        await api.delete(`/api/blogs/${idOfFirstBlog}`)
            .set('Authorization', `Bearer ${TOKEN}`)
        await api.put(`/api/blogs/${idOfFirstBlog}`)
            .send({ 'title' : 'Updated Title 123' })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(404)
    })

    test('will not update likes if input is not a valid number', async () => {
        let result = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
        const idOfFirstBlog = result.body[0].id
        result = await api.put(`/api/blogs/${idOfFirstBlog}`)
            .send({ 'likes' : 'asd123' })
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200)

        assert.strictEqual(result.body.likes, 35)
    })

    after(async () => {
        await mongoose.connection.close()
        console.log('Connection to MongoDB closed')
    })
})
