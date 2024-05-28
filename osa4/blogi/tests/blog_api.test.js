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


test('adding a new blog works', async () => {
    const newEntry = {   
        "title": "Testi 2000",
        "author": "Marko",
        "url": "",
        "likes": 1
    }

    await api.post('/api/blogs')
        .send(newEntry)
        .set('Content-Type', 'application/json')

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 3)
    assert.strictEqual(response.body[2].author, 'Marko')
})


test('when adding a blog without likes key, default to 0', async () => {
    const exampleWithoutLikes = [
        {
            "title": "Taas testi 3535",
            "author": "Jesse James",
            "url": ""
        }
    ]

    await api.post('/api/blogs')
        .send(exampleWithoutLikes)
        .set('Content-Type', 'application/json')

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body[2].likes, 0)
    assert.strictEqual(response.body.length, 3)
})


after(async () => {
    await mongoose.connection.close()
})