import { PROFILE } from '../config/Constants.jsx'
import '../../styles/Profile.css'

function Profile() {
  return (
    <section className="page-card profile-page">
      <div className="page-intro">
        <p className="eyebrow">Profile</p>
        <h1>{PROFILE.name}</h1>
      </div>
      <article className="profile-card">
        <dl>
          <div>
            <dt>Program</dt>
            <dd>{PROFILE.program}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{PROFILE.email}</dd>
          </div>
          <div>
            <dt>Contact Number</dt>
            <dd>{PROFILE.contactNumber}</dd>
          </div>
        </dl>
      </article>
    </section>
  )
}

export default Profile
