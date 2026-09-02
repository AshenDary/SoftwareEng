import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../../styles/Header.css'

function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  const handleLogout = () => { onLogout(); navigate('/login') }
  return <header className="site-header"><nav className="navbar" aria-label="Main navigation"><Link className="brand" to={isLoggedIn ? '/dashboard' : '/login'}>My React Blog</Link><div className="nav-links">{isLoggedIn && <><NavLink to="/dashboard">Dashboard</NavLink><NavLink to="/blogs">Blog List</NavLink><NavLink to="/profile">Profile</NavLink></>}{isLoggedIn ? <button className="nav-button" onClick={handleLogout}>Logout</button> : <NavLink to="/login">Login</NavLink>}</div></nav></header>
}
export default Header
