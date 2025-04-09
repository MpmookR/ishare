import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { AppContext } from '../context/AppContext';
import TextField from '../components/TextField';
import Button from '../components/Button';

export default function RegisterPage() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ username, email, password });
      login(data, data.token);
      navigate('/');
    } catch {
      setError('Registration failed. Email may already be in use.');
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* Left-side image */}
        <div className="col-md-6 d-none d-md-block" style={{ height: '100vh', overflow: 'hidden' }}>
          <img
            src="/img/preview.png"
            alt="Grid"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Right-side form */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{ height: '100vh', backgroundColor: 'var(--color-bg)', overflow: 'hidden' }}
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-h2)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              Register
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-4">
              <TextField
                id="username"
                label="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Fullname"
              />

              <div className="mt-3">
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>

              <div className="mt-3">
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <div className="mt-4">
                <Button type="submit">Sign Up</Button>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16 }}>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{ color: 'var(--color-primary-orange)', textDecoration: 'none' }}
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
