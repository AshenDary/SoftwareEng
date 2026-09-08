import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useState, useEffect } from 'react'
import { getStatistics } from '../../services/statisticsService.jsx'
import '../../styles/Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics()
        setStats(data)
      } catch (err) {
        setError('Failed to load statistics')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <section className="page-card dashboard-page"><div className="spinner">Loading Dashboard...</div></section>
  if (error) return <section className="page-card dashboard-page"><p className="error-message">{error}</p></section>

  const kpis = [
    { label: 'View Counts', value: stats.totalViews },
    { label: 'Number of Likes', value: stats.totalLikes },
    { label: 'Number of Comments', value: stats.totalComments },
    { label: 'Total Blogs', value: stats.totalArticles },
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
            <BarChart data={stats.articleStats} margin={{ top: 16, right: 16, bottom: 72, left: 8 }}>
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
