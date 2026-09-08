import { useEffect, useState } from 'react'
import { getComments } from '../../services/commentsService.jsx'
import '../../styles/BlogList.css'

function CommentsList({ selectedBlogId, blogs }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const blog = blogs.find((item) => item._id === selectedBlogId)

  useEffect(() => {
    if (!selectedBlogId) return
    const fetchComments = async () => {
      setLoading(true)
      try {
        const data = await getComments(selectedBlogId)
        setComments(data)
      } catch (err) {
        setError('Failed to load comments')
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [selectedBlogId])

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
      {loading && <p>Loading comments...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment, index) => (
            <article className="comment-item" key={comment._id || index}>
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
            </article>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No comments yet.</p>
      )}
    </section>
  )
}

export default CommentsList
