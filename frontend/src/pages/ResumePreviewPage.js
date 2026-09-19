import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import * as api from '../services/api';
import ResumePreview from '../components/ResumePreview/ResumePreview';
import PDFDownloadButton from '../components/PDFDownloadButton';
import LoadingSpinner from '../components/LoadingSpinner';

const ResumePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.getResumeById(id);
        setResume(data);
        setSelectedTemplate(data.template || 'modern');
      } catch (error) {
        toast.error('Failed to load resume');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadResume();
  }, [id, navigate]);

  const handleShare = () => {
    if (resume?.shareSlug) {
      const shareUrl = `${window.location.origin}/shared/${resume.shareSlug}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    }
  };

  const handleTemplateChange = async (template) => {
    setSelectedTemplate(template);
    try {
      await api.updateResume(id, { template });
    } catch (error) {
      console.error('Template update failed:', error);
    }
  };

  if (loading) return <LoadingSpinner text="Loading preview..." />;

  return (
    <div className="container-fluid py-3">
      {/* Controls Bar */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2 px-3">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate('/dashboard')}
          >
            <FaArrowLeft className="me-1" /> Back
          </button>
          <h5 className="mb-0 fw-bold">{resume?.title || 'Resume Preview'}</h5>
        </div>

        <div className="d-flex align-items-center gap-2">
          <select
            className="form-select form-select-sm"
            value={selectedTemplate}
            onChange={(e) => handleTemplateChange(e.target.value)}
            style={{ width: '160px' }}
          >
            <option value="modern">Modern</option>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
            <option value="ats-friendly">ATS-Friendly</option>
          </select>
          <button
            className="btn btn-outline-info d-flex align-items-center gap-2"
            onClick={handleShare}
          >
            <FaShareAlt /> Share
          </button>
          <PDFDownloadButton
            resumeId={resume?._id}
            fileName={resume?.personalInfo?.fullName || resume?.title || 'resume'}
          />
        </div>
      </div>

      {/* Full Preview */}
      <div className="d-flex justify-content-center">
        <div className="preview-full-page">
          <ResumePreview data={resume} template={selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewPage;
