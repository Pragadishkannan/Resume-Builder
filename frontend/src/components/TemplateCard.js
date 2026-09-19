import React from 'react';
import { FaFileAlt, FaEdit, FaTrash, FaCopy, FaDownload, FaShareAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const templateColors = {
  modern: '#667eea',
  professional: '#2c3e50',
  creative: '#e74c3c',
  'ats-friendly': '#27ae60',
};

const TemplateCard = ({ resume, onDelete, onDuplicate }) => {
  const navigate = useNavigate();

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/shared/${resume.shareSlug}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
  };

  const handleDownload = async () => {
    try {
      await api.incrementDownload(resume._id);
      navigate(`/preview/${resume._id}`);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card resume-card h-100 border-0 shadow-sm">
        <div
          className="card-header border-0 text-white d-flex align-items-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${templateColors[resume.template] || '#667eea'}, ${templateColors[resume.template] || '#667eea'}dd)`,
            borderRadius: '12px 12px 0 0',
          }}
        >
          <FaFileAlt size={18} />
          <span className="fw-semibold text-truncate">{resume.title}</span>
        </div>
        <div className="card-body">
          <p className="text-muted small mb-1">
            <strong>Name:</strong> {resume.personalInfo?.fullName || 'Not set'}
          </p>
          <p className="text-muted small mb-1">
            <strong>Template:</strong>{' '}
            <span className="badge bg-primary bg-opacity-10 text-primary">
              {resume.template}
            </span>
          </p>
          <p className="text-muted small mb-1">
            <strong>Downloads:</strong> {resume.downloadsCount || 0}
          </p>
          <p className="text-muted small mb-0">
            <strong>Updated:</strong>{' '}
            {new Date(resume.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="card-footer bg-transparent border-0 pb-3">
          <div className="d-flex flex-wrap gap-1">
            <button
              className="btn btn-sm btn-outline-primary flex-fill"
              onClick={() => navigate(`/edit/${resume._id}`)}
              title="Edit"
            >
              <FaEdit size={12} /> Edit
            </button>
            <button
              className="btn btn-sm btn-outline-info flex-fill"
              onClick={() => navigate(`/preview/${resume._id}`)}
              title="Preview"
            >
              <FaEye size={12} /> View
            </button>
            <button
              className="btn btn-sm btn-outline-success flex-fill"
              onClick={handleDownload}
              title="Download"
            >
              <FaDownload size={12} />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleShare}
              title="Share"
            >
              <FaShareAlt size={12} />
            </button>
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => onDuplicate(resume._id)}
              title="Duplicate"
            >
              <FaCopy size={12} />
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(resume._id)}
              title="Delete"
            >
              <FaTrash size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
