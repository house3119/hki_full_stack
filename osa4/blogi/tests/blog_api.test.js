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
        "url": "www.markonblogi.fi",
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
    const exampleWithoutLikes = {
        "title": "Taas testi 3535",
        "author": "Jesse James",
        "url": "www.jesse.ai"
    }

    await api.post('/api/blogs')
        .send(exampleWithoutLikes)
        .set('Content-Type', 'application/json')

    const response = await api.get('/api/blogs')

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
        .expect(400)

    await api.post('/api/blogs')
        .send(faultyBlogs[1])
        .expect(400)

    await api.post('/api/blogs')
        .send(faultyBlogs[2])
        .expect(400)

    const result = await api.get('/api/blogs')

    assert.strictEqual(result.body.length, 2)
})


test('deleting post returns 200 and blog is actually removed', async () => {
    let result = await api.get('/api/blogs')
    const idOfFirstBlog = result.body[0].id
    await api.delete(`/api/blogs/${idOfFirstBlog}`)
        .expect(200)

    result = await api.get('/api/blogs')
    assert.strictEqual(result.body.length, 1)
})


test('trying to delete post with invalid id returns 400', async () => {
    await api.delete('/api/blogs/invalidTestId123')
        .expect(400)
})


test('returns 404 when id is valid but blog with that id doesnt exist', async () => {
    let result = await api.get('/api/blogs')
    const idOfFirstBlog = result.body[0].id
    await api.delete(`/api/blogs/${idOfFirstBlog}`)
        .expect(200)

    await api.delete(`/api/blogs/${idOfFirstBlog}`)
        .expect(404)
})


after(async () => {
    await mongoose.connection.close()
})