import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogFormModal from '../modal/BlogFormModal.jsx'
import ConfirmPopUp from '../modal/ConfirmPopUp.jsx'
import CommentsList from './CommentsList.jsx'
import '../../styles/BlogList.css'

function BlogList({ blogs, setBlogs }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [editingBlog, setEditingBlog] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const categories = useMemo(() => [...new Set(blogs.map((blog) => blog.category))], [blogs])
  const filteredBlogs = blogs.filter((blog) => {
    const keyword = search.toLowerCase()
    const matchesSearch = blog.title.toLowerCase().includes(keyword) || blog.content.toLowerCase().includes(keyword)
    const matchesCategory = !category || blog.category === category
    return matchesSearch && matchesCategory
  })

  const handleLike = (blogId) => {
    setBlogs((currentBlogs) => currentBlogs.map((blog) => (blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog)))
  }

  const handleOpenCreate = () => {
    setEditingBlog(null)
    setIsFormOpen(true)
  }

  const handleSubmitBlog = (form) => {
    if (editingBlog) {
      setBlogs((currentBlogs) => currentBlogs.map((blog) => (blog.id === editingBlog.id ? { ...blog, title: form.title, category: form.category, excerpt: form.description.slice(0, 110), content: form.description } : blog)))
    } else {
      const nextBlog = {
        id: Date.now(),
        title: form.title,
        author: 'Jared L. Noel',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        category: form.category,
        excerpt: form.description.slice(0, 110),
        content: form.description,
        views: 0,
        likes: 0,
        comments: [],
      }
      setBlogs((currentBlogs) => [nextBlog, ...currentBlogs])
    }
    setEditingBlog(null)
    setIsFormOpen(false)
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setIsFormOpen(true)
  }

  const handleConfirmDelete = () => {
    setBlogs((currentBlogs) => currentBlogs.filter((blog) => blog.id !== deleteTarget.id))
    if (selectedBlogId === deleteTarget.id) setSelectedBlogId(null)
    setDeleteTarget(null)
  }

  return (
    <section className="page-card blog-list-page">
      <div className="page-heading-row">
        <div className="page-intro">
          <p className="eyebrow">Blog List</p>
          <h1>Manage Blogs</h1>
          <p>Showing {filteredBlogs.length} blog{filteredBlogs.length === 1 ? '' : 's'}.</p>
        </div>
        <button type="button" className="button-primary" onClick={handleOpenCreate}>New Blog</button>
      </div>

      <div className="blog-filters">
        <label>
          Search
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search blogs" />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="managed-blog-list">
        {filteredBlogs.map((blog) => (
          <article className="managed-blog-card" key={blog.id}>
            <div>
              <p className="blog-category">{blog.category}</p>
              <h2>{blog.title}</h2>
              <p className="blog-meta">By {blog.author} · {blog.date}</p>
              <p>{blog.excerpt}</p>
              <p className="blog-stats">{blog.views} views · {blog.likes} likes · {blog.comments.length} comments</p>
            </div>
            <div className="blog-actions">
              <button type="button" className="button-primary" onClick={() => handleLike(blog.id)}>Like</button>
              <button type="button" className="button-secondary" onClick={() => setSelectedBlogId(selectedBlogId === blog.id ? null : blog.id)}>View Comments</button>
              <button type="button" className="button-secondary" onClick={() => handleEdit(blog)}>Edit</button>
              <button type="button" className="button-secondary" onClick={() => setDeleteTarget(blog)}>Delete</button>
              <Link className="button-link" to={`/blog/${blog.id}`}>Open</Link>
            </div>
          </article>
        ))}
      </div>

      {!filteredBlogs.length && <p className="no-results">No blogs match your filters.</p>}
      <CommentsList selectedBlogId={selectedBlogId} blogs={blogs} />

      {isFormOpen && <BlogFormModal key={editingBlog?.id || 'create'} initialBlog={editingBlog} onSubmit={handleSubmitBlog} onCancel={() => setIsFormOpen(false)} />}
      {deleteTarget && (
        <ConfirmPopUp
          title="Delete blog?"
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          confirmText="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </section>
  )
}

export default BlogList
