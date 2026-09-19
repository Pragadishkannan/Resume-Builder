import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="auth-card p-4 p-md-5 rounded-4 shadow-lg">
              <div className="text-center mb-4">
                <HiDocumentText size={48} className="text-primary mb-2" />
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">Sign in to continue building your resume</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <FaEnvelope className="me-1" /> Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="loginEmail"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">
                    <FaLock className="me-1" /> Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="loginPassword"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                  id="loginBtn"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <>
                      <FaSignInAlt /> Sign In
                    </>
                  )}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary fw-bold text-decoration-none">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
