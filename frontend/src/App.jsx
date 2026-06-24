import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/layout/ProtectedRoute'
import { useAuth } from './store/authStore'
import Home from './pages/Home'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Tracker from './pages/Tracker'
import Blog from './pages/Blog'
import Account from './pages/Account'
import Landing from './pages/Landing'

function OnboardingGate() {
  const { onboardingDone, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-transparent">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    )
  }

  if (onboardingDone) return <Navigate to="/home" replace />
  return <Onboarding />
}


function App() {
  const loadProfile = useAuth((state) => state.loadProfile)

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute requireOnboarding={false}>
              <OnboardingGate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracker"
          element={
            <ProtectedRoute>
              <Tracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
