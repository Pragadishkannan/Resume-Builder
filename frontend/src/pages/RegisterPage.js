import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const { toast } = await import('react-toastify');
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
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
                <h2 className="fw-bold">Create Account</h2>
                <p className="text-muted">Join ResumeForge and build amazing resumes</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <FaUser className="me-1" /> Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    id="registerName"
                  />
                </div>

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
                    id="registerEmail"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">
                    <FaLock className="me-1" /> Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    id="registerPassword"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">
                    <FaLock className="me-1" /> Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    id="registerConfirmPassword"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                  id="registerBtn"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <>
                      <FaUserPlus /> Create Account
                    </>
                  )}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Already have an account?{' '}
                <Link to="/login" className="text-primary fw-bold text-decoration-none">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
