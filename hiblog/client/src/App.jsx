import { useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Header from './components/navbar/Header.jsx'
import Footer from './components/navbar/Footer.jsx'
import Sidebar from './components/navbar/Sidebar.jsx'
import About from './components/pages/About.jsx'
import Contact from './components/pages/Contact.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import BlogsPage from './components/pages/BlogsPage.jsx'
import Login from './components/pages/Login.jsx'
import Profile from './components/pages/Profile.jsx'
import ViewBlog from './pages/ViewBlog.jsx'

function AuthenticatedLayout({ onLogout }) {
  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={onLogout} />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const onLogout = () => setIsLoggedIn(false)

  return (
    <BrowserRouter>
      <div className="app-shell">
        {!isLoggedIn && <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />}
        <Routes>
          <Route path="/login" element={<main className="main-content"><Login setIsLoggedIn={setIsLoggedIn} /></main>} />
          <Route
            element={(
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AuthenticatedLayout onLogout={onLogout} />
              </ProtectedRoute>
            )}
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/:id" element={<ViewBlog />} />
          </Route>
          <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
        </Routes>
        {!isLoggedIn && <Footer />}
      </div>
    </BrowserRouter>
  )
}

export default App
