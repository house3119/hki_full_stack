const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')





blogRouter.get('/', async (request, response, next) => {
    const result = await Blog.find({ }).populate('user', { username: 1, name: 1 })
    response.json(result)
})


blogRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const user = request.user
            
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
    
        if (!blog.title || !blog.url) {
            response.status(400).send({message: "Blog title or URL missing"})
        } else {
            const result = await blog.save()
            user.blogs = user.blogs.concat(result._id)
            await user.save()
            response.status(201).json(result)
        }

    } catch (error) {
        next(error)
    }
})


blogRouter.put('/:id', async (request, response, next) => {
    const blogObject = request.body
    blogObject.id = request.params.id

    if (!mongoose.Types.ObjectId.isValid(blogObject.id)) {
        response.status(400).end()

    } else {
        const updatedInfo = {}

        if (blogObject.title) {
            updatedInfo.title = String(blogObject.title)
        }
        if (blogObject.author) {
            updatedInfo.author = String(blogObject.author)
        }
        if (blogObject.url) {
            updatedInfo.url = String(blogObject.url)
        }
        if (blogObject.likes && !isNaN(blogObject.likes)) {
            updatedInfo.likes = blogObject.likes
        }

        try {
            let result = await Blog.findByIdAndUpdate(blogObject.id, updatedInfo)
            result = await Blog.findById(result.id)
            response.status(200).json(result)
        } catch(err) {
            response.status(404).end()
        } 
    }
})


blogRouter.delete('/:id', async (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        response.status(400).end()

    } else {
        try {
            const blogToBeDeleted = await Blog.findById(request.params.id)
            console.log(request.user)

            if (!request.user) {
                response.status(404).send({ "error" : "User not found" })

            } else if (!blogToBeDeleted) {
                response.status(404).send({ "error" : "Blog not found, maybe already deleted" })

            } else {
                if (request.user._id.toString() === blogToBeDeleted.user.toString()) {
                    const result = await Blog.findByIdAndDelete(blogToBeDeleted._id)
                    if (!result) {
                        response.status(404).end()
                    } else {
                        response.status(204).end()
                    }
                } else {
                    response.status(403).send({ "message" : "Forbidden" })
                }
            }

        } catch (error) {
            next(error)
        }
    }
})


module.exports = blogRouter