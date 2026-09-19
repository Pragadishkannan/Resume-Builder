import React from 'react';
import { useNavigate } from 'react-router-dom';

const templatesList = [
  {
    slug: 'modern',
    name: 'Modern Template',
    desc: 'Clean layout with accent color sidebar. Perfect for tech and creative professionals.',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    features: ['Sidebar layout', 'Skill tags', 'Modern typography', 'Profile photo'],
  },
  {
    slug: 'professional',
    name: 'Professional Template',
    desc: 'Traditional polished layout with classic formatting. Ideal for corporate roles.',
    gradient: 'linear-gradient(135deg, #2c3e50, #34495e)',
    features: ['Classic design', 'Horizontal dividers', 'Serif headings', 'Formal tone'],
  },
  {
    slug: 'creative',
    name: 'Creative Template',
    desc: 'Bold, eye-catching design with vibrant colors. Great for designers and artists.',
    gradient: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    features: ['Colorful layout', 'Timeline style', 'Two-column', 'Profile photo'],
  },
  {
    slug: 'ats-friendly',
    name: 'ATS-Friendly Template',
    desc: 'Simple, clean format optimized for Applicant Tracking Systems.',
    gradient: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    features: ['Single column', 'Plain text', 'No graphics', 'ATS optimized'],
  },
];

const TemplatesPage = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (slug) => {
    navigate('/create', { state: { template: slug } });
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Resume Templates</h1>
        <p className="text-muted lead">
          Choose a template to start building your professional resume
        </p>
      </div>

      <div className="row g-4">
        {templatesList.map((tmpl) => (
          <div key={tmpl.slug} className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm template-select-card">
              {/* Preview Thumbnail */}
              <div
                className="card-img-top d-flex align-items-center justify-content-center"
                style={{
                  background: tmpl.gradient,
                  height: '200px',
                  borderRadius: '12px 12px 0 0',
                  fontSize: '3rem',
                }}
              >
                📄
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold">{tmpl.name}</h5>
                <p className="card-text text-muted small">{tmpl.desc}</p>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {tmpl.features.map((f, i) => (
                    <span key={i} className="badge bg-primary bg-opacity-10 text-primary">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 pb-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleUseTemplate(tmpl.slug)}
                >
                  Use This Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
