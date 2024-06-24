import { useState } from "react"

const Blog = ({
    id,
    title,
    author,
    url,
    likes,
    user,
    likeBlog,
    addedByCurrentLoggedInUser,
    removeBlog
}) => {

    const [collapsed, setCollapsed] = useState(false)

    const toggleView = () => {
        setCollapsed(!collapsed)
    }

    const likeButtonClick = (event) => {
        event.preventDefault()
        likeBlog(id)
    }

    const removeButtonClick = (event) => {
        event.preventDefault()
        if (window.confirm(`Really want to remove blog "${title}" by ${author}`)) {
            removeBlog(id)
        }
    }

    return (
        <div className="blog-div">
            <span>{title} - by {author} </span>            
            <button className="blog-view-button" onClick={ toggleView }>{collapsed? 'Hide': 'View'}</button>

            {collapsed &&
                <div>
                    <p>Url: {url}</p>
                    <p>Likes: {likes}<button className="blog-like-button" onClick={ likeButtonClick }>Like</button> </p>
                    <p>User: {user} </p>

                    {addedByCurrentLoggedInUser === 'true' &&
                        <button onClick={removeButtonClick}>Remove</button>
                    }         
                </div>    
            }            
        </div>
    )
}

export default Blog