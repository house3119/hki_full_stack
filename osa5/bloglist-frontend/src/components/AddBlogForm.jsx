const AddBlogForm = ({
    addNewBlog,
    newBlogTitle,
    newBlogAuthor,
    newBlogUrl,
    handleNewBlogTitleChange,
    handleNewBlogAuthorChange,
    handleNewBlogUrlChange
}) => {
    return (
        <div>
            <h2>Add New Blog</h2>
            <form onSubmit={addNewBlog}>
                <label htmlFor="new-blog-title">Title</label>
                <input type="text" id="new-blog-title" value={newBlogTitle} onChange={handleNewBlogTitleChange}/>
                <br />
                <label htmlFor="new-blog-author">Author</label>
                <input type="text" id="new-blog-author" value={newBlogAuthor}  onChange={handleNewBlogAuthorChange}/>
                <br />
                <label htmlFor="new-blog-url">Url</label>
                <input type="text" id="new-blog-url" value={newBlogUrl}  onChange={handleNewBlogUrlChange}/>
                <br />
                <button type="submit">Add Blog</button>
            </form>
            <br />        
        </div>        
    )
}

export default AddBlogForm