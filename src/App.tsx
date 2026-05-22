import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Track from './pages/Track'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AuthGuard from './components/AuthGuard'
import Navbar from './components/Navbar'
import SEO from './components/SEO'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main className="app-main" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/sl-portal" element={<AdminLogin />} />
          <Route
            path="/sl-portal/dashboard"
            element={
              <AuthGuard>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="*"
            element={
              <section className="not-found">
                <SEO
                  title="Page Not Found | Stride Logistics"
                  description="The requested Stride Logistics page could not be found."
                />
                <span className="eyebrow">Route not found</span>
                <h1>PAGE NOT FOUND</h1>
                <p>The page you are looking for is unavailable. Choose a path below to keep moving.</p>
                <div className="not-found-actions">
                  <Link className="btn btn-primary" to="/">Back Home</Link>
                  <Link className="btn btn-outline" to="/track">Track Shipment</Link>
                  <Link className="btn btn-outline" to="/contact">Contact Operations</Link>
                </div>
              </section>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
