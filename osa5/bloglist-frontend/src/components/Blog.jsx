import { useState } from "react"

const Blog = ({
    title,
    author,
    url,
    likes,
    user
}) => {

    const [collapsed, setCollapsed] = useState(false)

    const toggleView = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div className="blog-div">
            <span>{title} - by {author} </span>            
            <button className="blog-view-button" onClick={ toggleView }>{collapsed? 'Hide': 'View'}</button>

            {collapsed &&
                <div>
                    <p>Url: {url}</p>
                    <p>Likes: {likes}<button className="blog-like-button">Like</button> </p>
                    <p>User: {user} </p>               
                </div>
            }            
        </div>
    )
}

export default Blog