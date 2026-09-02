import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import '../../styles/Dashboard.css'

function Dashboard({ blogs }) {
  const totals = blogs.reduce(
    (summary, blog) => ({
      views: summary.views + blog.views,
      likes: summary.likes + blog.likes,
      comments: summary.comments + blog.comments.length,
    }),
    { views: 0, likes: 0, comments: 0 },
  )

  const chartData = blogs.map((blog) => ({ title: blog.title, views: blog.views }))
  const kpis = [
    { label: 'View Counts', value: totals.views },
    { label: 'Number of Likes', value: totals.likes },
    { label: 'Number of Comments', value: totals.comments },
    { label: 'Total Blogs', value: blogs.length },
  ]

  return (
    <section className="page-card dashboard-page">
      <div className="page-intro">
        <p className="eyebrow">Dashboard</p>
        <h1>Blog Performance</h1>
      </div>
      <div className="kpi-grid">
        {kpis.map((item) => (
          <article className="kpi-card" key={item.label}>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
      <section className="chart-panel" aria-label="Views per blog chart">
        <h2>Views Per Blog</h2>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData} margin={{ top: 16, right: 16, bottom: 72, left: 8 }}>
              <CartesianGrid stroke="#000" strokeDasharray="0" vertical={false} />
              <XAxis dataKey="title" stroke="#000" tick={{ fill: '#000', fontSize: 12 }} angle={-30} textAnchor="end" interval={0} height={90} />
              <YAxis stroke="#000" tick={{ fill: '#000', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#fff' }} contentStyle={{ background: '#fff', border: '2px solid #000', color: '#000' }} />
              <Bar dataKey="views" fill="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </section>
  )
}

export default Dashboard
