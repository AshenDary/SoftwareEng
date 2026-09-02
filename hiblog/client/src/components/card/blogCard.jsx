import { useNavigate } from 'react-router-dom'
import '../../styles/BlogCard.css'

function BlogCard({ blog }) {
  const navigate = useNavigate()

  return (
    <article className="blog-card">
      <p className="blog-category">{blog.category}</p>
      <h2>{blog.title}</h2>
      <p className="blog-meta">By {blog.author} · {blog.date}</p>
      <p>{blog.excerpt}</p>
      <button type="button" onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}>View Blog</button>
    </article>
  )
}

export default BlogCard
