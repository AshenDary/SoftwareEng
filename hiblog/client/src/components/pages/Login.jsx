import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USERS, USERS_STORAGE_KEY } from '../config/Constants.jsx'
import SuccessPopUp from '../modal/SuccessPopUp.jsx'
import FailedPopUp from '../modal/FailedPopUp.jsx'
import '../../styles/Login.css'

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [isRegistering, setIsRegistering] = useState(false)
  const [modalState, setModalState] = useState('')
  const navigate = useNavigate()
  const getStoredUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') } catch { return [] }
  }
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const toggleMode = () => { setIsRegistering(!isRegistering); setStatus({ type: '', text: '' }); setModalState(''); setForm({ username: '', password: '' }) }
  const handleDismissSuccess = () => {
    setIsLoggedIn(true)
    navigate('/')
  }
  const handleLogin = (event) => {
    event.preventDefault()
    const username = form.username.trim()
    const users = [...USERS, ...getStoredUsers()]

    if (isRegistering) {
      if (username.length < 3 || form.password.length < 6) {
        setModalState('failed'); setStatus({ type: 'error', text: 'Use a username with at least 3 characters and a password with at least 6.' })
        return
      }
      if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
        setModalState('failed'); setStatus({ type: 'error', text: 'That username is already in use.' })
        return
      }
      const storedUsers = getStoredUsers()
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...storedUsers, { username, password: form.password }]))
      setModalState('success')
      return
    }

    const validUser = users.find((user) => user.username === username && user.password === form.password)
    if (validUser) { setModalState('success') } else { setModalState('failed'); setStatus({ type: 'error', text: 'Invalid username or password. Please try again.' }) }
  }
  return <section className="page-card login-card"><p className="eyebrow">Member access</p><h1>{isRegistering ? 'Create an account' : 'Welcome back'}</h1><p className="login-hint">{isRegistering ? 'Your account will be saved only in this browser.' : <>Sign in to read the blog. Demo: <code>jared</code> / <code>reactblog2026</code></>}</p><form className="login-form" onSubmit={handleLogin}><label>Username<input name="username" value={form.username} onChange={handleChange} autoComplete="username" required /></label><label>Password<input type="password" name="password" value={form.password} onChange={handleChange} autoComplete={isRegistering ? 'new-password' : 'current-password'} required /></label><button type="submit">{isRegistering ? 'Create account' : 'Login'}</button>{status.text && <p className={`status-message ${status.type}`} role="status">{status.text}</p>}</form><button className="mode-button" type="button" onClick={toggleMode}>{isRegistering ? 'Already have an account? Login' : 'New here? Create an account'}</button>{modalState === 'success' && <SuccessPopUp Title="Welcome" Message={isRegistering ? 'Your account was created successfully.' : 'You have logged in successfully.'} onClose={handleDismissSuccess} />}{modalState === 'failed' && <FailedPopUp Title="Login failed" Message={status.text} />}</section>
}
export default Login
