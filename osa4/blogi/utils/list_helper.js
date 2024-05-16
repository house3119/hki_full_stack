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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}