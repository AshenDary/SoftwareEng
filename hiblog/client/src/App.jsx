import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Header from './components/navbar/Header.jsx'
import Footer from './components/navbar/Footer.jsx'
import Home from './components/pages/Home.jsx'
import About from './components/pages/About.jsx'
import Contact from './components/pages/Contact.jsx'
import Login from './components/pages/Login.jsx'
import ViewBlog from './pages/ViewBlog.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const onLogout = () => setIsLoggedIn(false)

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute isLoggedIn={isLoggedIn}><About /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Contact /></ProtectedRoute>} />
            <Route path="/blog/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ViewBlog /></ProtectedRoute>} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
