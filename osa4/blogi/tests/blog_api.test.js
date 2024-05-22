const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const examples = [
    {
        "title": "Testi 35",
        "author": "Kille the Pwner",
        "url": "",
        "likes": 35
    },
    {
        "title": "Testi 69",
        "author": "Jape the Owner",
        "url": "",
        "likes": 131
    }   
]

beforeEach(async () => {
    await Blog.deleteMany({ })

    let blogObject = new Blog(examples[0])
    await blogObject.save()

    blogObject = new Blog(examples[1])
    await blogObject.save()
})

test('test that 2 blogs returned as json', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 2)
})


test('identifying field in returned blog is called "id"', async () => {
    const response = await api.get('/api/blogs')
    const exampleBlog = response.body[0]
    
    assert.strictEqual(('id' in exampleBlog), true)
    assert.strictEqual(('_id' in exampleBlog), false)
})


after(async () => {
    await mongoose.connection.close()
})