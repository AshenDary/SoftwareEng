import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ConfirmPopUp from '../modal/ConfirmPopUp.jsx'
import '../../styles/Sidebar.css'

function Sidebar({ onLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const navigate = useNavigate()

  const handleConfirmLogout = () => {
    onLogout()
    setShowLogoutConfirm(false)
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <NavLink className="sidebar-brand" to="/dashboard">My React Blog</NavLink>
      <nav className="sidebar-nav" aria-label="Dashboard navigation">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/blogs">Blog List</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <button type="button" onClick={() => setShowLogoutConfirm(true)}>Logout</button>
      </nav>
      {showLogoutConfirm && (
        <ConfirmPopUp
          title="Logout?"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </aside>
  )
}

export default Sidebar
