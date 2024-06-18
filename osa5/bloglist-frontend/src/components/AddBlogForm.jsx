import { useState } from "react"

const AddBlogForm = ({ addNewBlog }) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const newBlog = async (event) => {
        event.preventDefault()
        const result = await addNewBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        })
        if (result) {
            setNewBlogTitle('')
            setNewBlogAuthor('')
            setNewBlogUrl('')
        }
    }

    return (
        <div>
            <h2>Add New Blog</h2>
            <form onSubmit={newBlog}>
                <label htmlFor="new-blog-title" className="new-blog-label">Title:</label>
                <input type="text" id="new-blog-title" value={newBlogTitle} onChange={({target}) => setNewBlogTitle(target.value)}/>
                <br />
                <label htmlFor="new-blog-author" className="new-blog-label">Author:</label>
                <input type="text" id="new-blog-author" value={newBlogAuthor}  onChange={({target}) => setNewBlogAuthor(target.value)}/>
                <br />
                <label htmlFor="new-blog-url" className="new-blog-label">Url:</label>
                <input type="text" id="new-blog-url" value={newBlogUrl}  onChange={({target}) => setNewBlogUrl(target.value)}/>
                <br />
                <button type="submit">Add Blog</button>
            </form>
            <br />        
        </div>        
    )
}

export default AddBlogForm