const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')


blogRouter.get('/', async (request, response, next) => {
    const result = await Blog.find({ })
    response.json(result)
})


blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
        response.status(400).send({ message: "Blog title or URL missing"})
    } else {
        const result = await blog.save()
        response.status(201).json(result)
    }
})


blogRouter.delete('/:id', async (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        response.status(400).end()

    } else {
        const result = await Blog.findOneAndDelete({ '_id' : request.params.id })

        if (result) {
            response.status(200).json(result)
        } else {
            response.status(404).end()
        }  
    }
})


module.exports = blogRouter