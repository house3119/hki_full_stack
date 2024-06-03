const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


blogRouter.get('/', async (request, response, next) => {
    const result = await Blog.find({ }).populate('user', { username: 1, name: 1 })
    response.json(result)
})


blogRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
    
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
        const result = await Blog.findOneAndDelete({ '_id' : request.params.id })

        if (result) {
            response.status(200).json(result)
        } else {
            response.status(404).end()
        }  
    }
})


module.exports = blogRouter