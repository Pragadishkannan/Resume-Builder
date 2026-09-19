import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaFileAlt, FaPalette, FaDownload, FaShieldAlt, FaMagic, FaMobileAlt } from 'react-icons/fa';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: <FaFileAlt size={32} />, title: 'Multiple Templates', desc: 'Choose from 4 professionally designed templates that suit your style and industry.' },
    { icon: <FaPalette size={32} />, title: 'Live Preview', desc: 'See real-time changes as you build your resume with our split-screen editor.' },
    { icon: <FaDownload size={32} />, title: 'PDF Download', desc: 'Download your resume as a high-quality PDF file ready for job applications.' },
    { icon: <FaShieldAlt size={32} />, title: 'ATS Optimized', desc: 'Our ATS-friendly template ensures your resume passes automated screening.' },
    { icon: <FaMagic size={32} />, title: 'Auto Save', desc: 'Never lose your work. Your resume saves automatically as you type.' },
    { icon: <FaMobileAlt size={32} />, title: 'Mobile Responsive', desc: 'Build and manage your resumes from any device, anywhere.' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Build Your <span className="text-gradient">Professional Resume</span> in Minutes
              </h1>
              <p className="hero-subtitle">
                Create stunning, job-winning resumes with our intuitive builder. 
                Choose from multiple templates, preview in real-time, and download as PDF.
              </p>
              <div className="d-flex gap-3 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/create" className="btn btn-primary btn-lg px-4 hero-btn">
                      Create Resume
                    </Link>
                    <Link to="/dashboard" className="btn btn-outline-primary btn-lg px-4">
                      My Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg px-4 hero-btn">
                      Get Started Free
                    </Link>
                    <Link to="/login" className="btn btn-outline-primary btn-lg px-4">
                      Login
                    </Link>
                  </>
                )}
              </div>
              <div className="mt-4 d-flex gap-4 hero-stats">
                <div>
                  <h4 className="mb-0 fw-bold text-primary">4+</h4>
                  <small className="text-muted">Templates</small>
                </div>
                <div>
                  <h4 className="mb-0 fw-bold text-primary">PDF</h4>
                  <small className="text-muted">Download</small>
                </div>
                <div>
                  <h4 className="mb-0 fw-bold text-primary">Free</h4>
                  <small className="text-muted">To Use</small>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-visual">
                <div className="hero-card hero-card-1">
                  <div className="hero-card-line w-75"></div>
                  <div className="hero-card-line w-50"></div>
                  <div className="hero-card-line w-100"></div>
                  <div className="hero-card-line w-60"></div>
                  <div className="hero-card-line w-80"></div>
                </div>
                <div className="hero-card hero-card-2">
                  <div className="hero-card-dot"></div>
                  <div className="hero-card-line w-60"></div>
                  <div className="hero-card-line w-40"></div>
                  <div className="hero-card-line w-90"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Everything You Need to Build a Great Resume</h2>
            <p className="text-muted">Powerful features to help you stand out from the crowd</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="feature-card h-100 p-4 rounded-4 text-center">
                  <div className="feature-icon mb-3 text-primary">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="templates-preview-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Choose Your Template</h2>
            <p className="text-muted">Professional templates designed for every industry</p>
          </div>
          <div className="row g-4 justify-content-center">
            {['Modern', 'Professional', 'Creative', 'ATS-Friendly'].map((name, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="template-preview-card text-center p-3 rounded-4">
                  <div className="template-thumb mb-2" style={{
                    background: ['linear-gradient(135deg, #667eea, #764ba2)',
                      'linear-gradient(135deg, #2c3e50, #34495e)',
                      'linear-gradient(135deg, #e74c3c, #c0392b)',
                      'linear-gradient(135deg, #27ae60, #2ecc71)'][i],
                    height: '160px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                  }}>
                    📄
                  </div>
                  <h6 className="fw-bold mb-0">{name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="cta-card text-center p-5 rounded-4">
            <h2 className="fw-bold text-white mb-3">Ready to Build Your Resume?</h2>
            <p className="text-white-50 mb-4">Start creating your professional resume today — it's free!</p>
            <Link
              to={isAuthenticated ? '/create' : '/register'}
              className="btn btn-light btn-lg px-5 fw-bold"
            >
              {isAuthenticated ? 'Create Resume Now' : 'Sign Up Free'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-muted border-top">
        <div className="container">
          <p className="mb-0">© 2024 ResumeForge. Built with ❤️ using MERN Stack.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
