import { Link, useLocation, useParams } from 'react-router-dom'
import { BLOGS } from '../components/config/Constants.jsx'
import '../styles/ViewBlog.css'

function ViewBlog({ blogs = BLOGS }) {
  const { id } = useParams()
  const location = useLocation()
  const blog = location.state?.blog || blogs.find((item) => item.id === Number(id))

  if (!blog) return <section className="page-card view-blog"><h1>Blog not found</h1><Link to="/blogs">Back to blogs</Link></section>

  return <article className="page-card view-blog"><p className="blog-category">{blog.category}</p><h1>{blog.title}</h1><p className="blog-meta">By {blog.author} · {blog.date}</p><p className="article-content">{blog.content}</p><Link className="back-link" to="/blogs">Back to all blogs</Link></article>
}

export default ViewBlog
