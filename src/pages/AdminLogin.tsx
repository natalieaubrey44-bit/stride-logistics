import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/sl-portal/dashboard', { replace: true });
      }
    });
  }, [navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        // Generic error message to avoid revealing existence of account
        setError('Invalid credentials. Please try again.');
      } else if (data.session) {
        navigate('/sl-portal/dashboard', { replace: true });
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">
      <SEO
        title="Admin Login | Stride Logistics"
        description="Secure Stride Logistics admin portal access."
        path="/sl-portal"
      />
      <div className="admin-login-card">
        <div className="wordmark" aria-label="Stride Logistics">
          <span>STRIDE</span>
          <span>LOGISTICS</span>
        </div>
        <span className="admin-kicker">Operations portal</span>
        <h1>Admin Login</h1>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form className="form-grid" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="admin@stridelogistics.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Password"
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
}
