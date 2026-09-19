import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaUser, FaSignOutAlt, FaCog, FaShieldAlt } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <HiDocumentText size={28} className="text-primary" />
          <span className="brand-text">ResumeForge</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/templates' ? 'active' : ''}`}
                    to="/templates"
                  >
                    Templates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}
                    to="/create"
                  >
                    Create Resume
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              className="btn btn-sm btn-outline-secondary rounded-circle p-2 dark-toggle"
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="darkModeToggle"
            >
              {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>

            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="userDropdown"
                >
                  {user?.profilePhoto ? (
                    <img
                      src={`http://localhost:5000${user.profilePhoto}`}
                      alt={user.name}
                      className="rounded-circle"
                      width="24"
                      height="24"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <FaUser size={14} />
                  )}
                  {user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg">
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                      <FaCog size={14} /> Profile
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/admin">
                        <FaShieldAlt size={14} /> Admin Panel
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 text-danger"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt size={14} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-sm btn-outline-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-sm btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
