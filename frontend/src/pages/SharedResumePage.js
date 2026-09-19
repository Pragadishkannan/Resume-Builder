import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../services/api';
import ResumePreview from '../components/ResumePreview/ResumePreview';
import LoadingSpinner from '../components/LoadingSpinner';

const SharedResumePage = () => {
  const { slug } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.getSharedResume(slug);
        setResume(data);
      } catch (error) {
        setError('Resume not found or link has expired.');
      } finally {
        setLoading(false);
      }
    };
    loadResume();
  }, [slug]);

  if (loading) return <LoadingSpinner text="Loading shared resume..." />;

  if (error) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: '4rem' }}>😕</div>
        <h3 className="fw-bold mt-3">Resume Not Found</h3>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-3">
        <h4 className="fw-bold">{resume?.personalInfo?.fullName || 'Shared Resume'}</h4>
        <p className="text-muted small">Shared via ResumeForge</p>
      </div>
      <div className="d-flex justify-content-center">
        <div className="preview-full-page">
          <ResumePreview data={resume} template={resume?.template || 'modern'} />
        </div>
      </div>
    </div>
  );
};

export default SharedResumePage;
