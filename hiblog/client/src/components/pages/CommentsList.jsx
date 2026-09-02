import '../../styles/BlogList.css'

function CommentsList({ selectedBlogId, blogs }) {
  const blog = blogs.find((item) => item.id === selectedBlogId)

  if (!blog) {
    return (
      <section className="comments-panel">
        <h2>Comments</h2>
        <p>Select a blog to view comments.</p>
      </section>
    )
  }

  return (
    <section className="comments-panel">
      <h2>Comments for {blog.title}</h2>
      {blog.comments.length ? (
        <div className="comments-list">
          {blog.comments.map((comment, index) => (
            <article className="comment-item" key={`${comment.author}-${index}`}>
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
            </article>
          ))}
        </div>
      ) : (
        <p>No comments yet.</p>
      )}
    </section>
  )
}

export default CommentsList
