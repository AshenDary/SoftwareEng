import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn, children }) {
  const location = useLocation()
  return isLoggedIn ? children : <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute
