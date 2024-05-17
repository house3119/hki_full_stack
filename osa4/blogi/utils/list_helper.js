const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogList) => {
    // Check for empty list
    if (blogList.length === 0) {
        return 0
    }

    // Add likes recursively, parameters: single blog object and it's location in the list
    const addLikesRecursive = (singleBlog, location) => {
        if ((location + 1) === blogList.length) {
            return singleBlog.likes
        } else {
            return singleBlog.likes + addLikesRecursive(blogList[location + 1], location + 1)
        }
    }

    // Start the call stack
    return addLikesRecursive(blogList[0], 0)
}


const favoriteBlog = (blogList) => {
    // Check for empty list
    if (blogList.length === 0) {
        return 'empty list'
    }

    // Define callback
    const returnBigger = (biggest, current) => {
        return (current.likes > biggest.likes)? current : biggest
    }

    return blogList.reduce(returnBigger, blogList[0])
}

const mostBlogs = (blogList) => {
    if (blogList.length === 0) {
        return 'empty list'
    }

    const authors = lodash.countBy(blogList, 'author')

    const authorList = Object.keys(authors).map((author) => {
        return {
        'author': author,
        'blogCount': authors[author]
        }
    })

    const compareAuthors = (leader, current) => {
        return (current.blogCount > leader.blogCount)? current : leader
    }

    return authorList.reduce(compareAuthors, authorList[0])
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}