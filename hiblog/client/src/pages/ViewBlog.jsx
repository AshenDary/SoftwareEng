import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArticle } from '../services/articleService.jsx'
import '../styles/ViewBlog.css'

function ViewBlog() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(id)
        setBlog(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load this blog. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  if (loading) return <section className="page-card view-blog"><div className="spinner">Loading...</div></section>
  if (error) return <section className="page-card view-blog"><p className="error-message">{error}</p><Link to="/blogs">Back to blogs</Link></section>
  if (!blog) return <section className="page-card view-blog"><h1>Blog not found</h1><Link to="/blogs">Back to blogs</Link></section>

  return <article className="page-card view-blog"><p className="blog-category">{blog.category}</p><h1>{blog.title}</h1><p className="blog-meta">By {blog.author} · {blog.date}</p><p className="article-content">{blog.content}</p><Link className="back-link" to="/blogs">Back to all blogs</Link></article>
}

export default ViewBlog
