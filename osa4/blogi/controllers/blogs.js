const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    const result = await Blog.find({ })
    response.json(result)
})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogRouter