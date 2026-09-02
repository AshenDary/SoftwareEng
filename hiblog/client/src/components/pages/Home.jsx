import { useState } from 'react'
import { BLOGS } from '../config/Constants.jsx'
import BlogCard from '../card/blogCard.jsx'
import '../../styles/Home.css'

function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [blogCount, setBlogCount] = useState(BLOGS.length)
  const categories = [...new Set(BLOGS.map((blog) => blog.category))]
  const filterBlogs = (nextSearch, nextCategory) => BLOGS.filter((blog) => (!nextCategory || blog.category === nextCategory) && blog.title.toLowerCase().includes(nextSearch.toLowerCase()))
  const filteredBlogs = filterBlogs(search, category)
  const handleSearch = (event) => { const nextSearch = event.target.value; setSearch(nextSearch); setBlogCount(filterBlogs(nextSearch, category).length) }
  const handleCategory = (event) => { const nextCategory = event.target.value; setCategory(nextCategory); setBlogCount(filterBlogs(search, nextCategory).length) }

  return <section className="page-card"><div className="page-intro"><p className="eyebrow">Latest stories</p><h1>My React Blog</h1><p>Showing {blogCount} blog{blogCount === 1 ? '' : 's'}.</p></div><div className="blog-filters"><label>Search by title<input value={search} onChange={handleSearch} placeholder="Search blogs" /></label><label>Category<select value={category} onChange={handleCategory}><option value="">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div><div className="blog-grid">{filteredBlogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)}</div>{!filteredBlogs.length && <p className="no-results">No blogs match your filters.</p>}</section>
}
export default Home
