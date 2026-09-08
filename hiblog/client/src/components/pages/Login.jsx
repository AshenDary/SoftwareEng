import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../../services/authService.jsx'
import SuccessPopUp from '../modal/SuccessPopUp.jsx'
import FailedPopUp from '../modal/FailedPopUp.jsx'
import '../../styles/Login.css'

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [modalState, setModalState] = useState('')
  const navigate = useNavigate()
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const toggleMode = () => { setIsRegistering(!isRegistering); setStatus({ type: '', text: '' }); setModalState(''); setForm({ username: '', password: '' }) }
  const handleDismissSuccess = () => {
    setIsLoggedIn(true)
    navigate('/')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (isRegistering) {
        await register({ username: form.username.trim(), password: form.password })
      } else {
        const data = await login({ username: form.username.trim(), password: form.password })
        localStorage.setItem('token', data.token)
      }
      setModalState('success')
    } catch (error) {
      setModalState('failed')
      setStatus({ type: 'error', text: error.response?.data?.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }
  return <section className="page-card login-card"><p className="eyebrow">Member access</p><h1>{isRegistering ? 'Create an account' : 'Welcome back'}</h1><p className="login-hint">{isRegistering ? 'Your account will be saved.' : <>Sign in to read the blog. Demo: <code>jared</code> / <code>reactblog2026</code></>}</p><form className="login-form" onSubmit={handleLogin}><label>Username<input name="username" value={form.username} onChange={handleChange} autoComplete="username" required disabled={loading}/></label><label>Password<input type="password" name="password" value={form.password} onChange={handleChange} autoComplete={isRegistering ? 'new-password' : 'current-password'} required disabled={loading}/></label><button type="submit" disabled={loading}>{loading ? 'Loading...' : (isRegistering ? 'Create account' : 'Login')}</button>{status.text && <p className={`status-message ${status.type}`} role="status">{status.text}</p>}</form><button className="mode-button" type="button" onClick={toggleMode}>{isRegistering ? 'Already have an account? Login' : 'New here? Create an account'}</button>{modalState === 'success' && <SuccessPopUp Title="Welcome" Message={isRegistering ? 'Your account was created successfully.' : 'You have logged in successfully.'} onClose={handleDismissSuccess} />}{modalState === 'failed' && <FailedPopUp Title="Login failed" Message={status.text} onClose={() => setModalState('')} />}</section>
}
export default Login
