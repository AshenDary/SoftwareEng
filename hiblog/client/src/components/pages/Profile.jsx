import { useState, useEffect } from 'react'
import { getProfile, updateProfile, changePassword } from '../../services/profileService.jsx'
import '../../styles/Profile.css'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return <section className="page-card profile-page"><div className="spinner">Loading Profile...</div></section>
  if (error) return <section className="page-card profile-page"><p className="error-message">{error}</p></section>

  return (
    <section className="page-card profile-page">
      <div className="page-intro">
        <p className="eyebrow">Profile</p>
        <h1>{profile.name}</h1>
      </div>
      <article className="profile-card">
        <dl>
          <div>
            <dt>Program</dt>
            <dd>{profile.program}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{profile.email}</dd>
          </div>
          <div>
            <dt>Contact Number</dt>
            <dd>{profile.contactNumber}</dd>
          </div>
        </dl>
      </article>
    </section>
  )
}

export default Profile
