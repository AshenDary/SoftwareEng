import { useState } from 'react'
import '../../styles/Modal.css'

const EMPTY_FORM = { title: '', category: '', description: '' }

function BlogFormModal({ initialBlog, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialBlog ? { title: initialBlog.title, category: initialBlog.category, description: initialBlog.content } : EMPTY_FORM)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
    })
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="blog-form-title">
        <h2 id="blog-form-title">{initialBlog ? 'Edit Blog' : 'Create Blog'}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} required />
          </label>
          <label>
            Description
            <textarea name="description" rows="6" value={form.description} onChange={handleChange} required />
          </label>
          <div className="modal-actions">
            <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="button-primary">{initialBlog ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default BlogFormModal
