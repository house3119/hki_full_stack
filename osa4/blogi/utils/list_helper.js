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


module.exports = {
    dummy,
    totalLikes
}