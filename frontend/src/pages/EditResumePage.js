import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSave, FaEye, FaCheck } from 'react-icons/fa';
import * as api from '../services/api';
import PersonalInfoForm from '../components/ResumeForm/PersonalInfoForm';
import CareerObjectiveForm from '../components/ResumeForm/CareerObjectiveForm';
import EducationForm from '../components/ResumeForm/EducationForm';
import SkillsForm from '../components/ResumeForm/SkillsForm';
import ProjectsForm from '../components/ResumeForm/ProjectsForm';
import InternshipsForm from '../components/ResumeForm/InternshipsForm';
import WorkExperienceForm from '../components/ResumeForm/WorkExperienceForm';
import CertificationsForm from '../components/ResumeForm/CertificationsForm';
import AchievementsForm from '../components/ResumeForm/AchievementsForm';
import LanguagesForm from '../components/ResumeForm/LanguagesForm';
import ResumePreview from '../components/ResumePreview/ResumePreview';
import LoadingSpinner from '../components/LoadingSpinner';

const EditResumePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState(null);
  const autoSaveTimer = useRef(null);

  // Load resume data
  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.getResumeById(id);
        setResumeData(data);
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

  // Auto-save
  const triggerAutoSave = useCallback(
    (data) => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      setAutoSaved(false);
      autoSaveTimer.current = setTimeout(async () => {
        try {
          await api.updateResume(id, data);
          setAutoSaved(true);
          setTimeout(() => setAutoSaved(false), 2000);
        } catch (err) {
          console.error('Auto-save failed:', err);
        }
      }, 2000);
    },
    [id]
  );

  const updateField = useCallback(
    (field, value) => {
      setResumeData((prev) => {
        const updated = { ...prev, [field]: value };
        triggerAutoSave(updated);
        return updated;
      });
    },
    [triggerAutoSave]
  );

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    updateField('template', template);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.updateResume(id, { ...resumeData, template: selectedTemplate });
      toast.success('Resume saved successfully!');
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'objective', label: 'Objective' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'projects', label: 'Projects' },
    { key: 'internships', label: 'Internships' },
    { key: 'experience', label: 'Experience' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'languages', label: 'Languages' },
  ];

  const renderFormSection = () => {
    if (!resumeData) return null;
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm data={resumeData.personalInfo} onChange={(val) => updateField('personalInfo', val)} />;
      case 'objective':
        return <CareerObjectiveForm data={resumeData.careerObjective} onChange={(val) => updateField('careerObjective', val)} />;
      case 'education':
        return <EducationForm data={resumeData.education} onChange={(val) => updateField('education', val)} />;
      case 'skills':
        return <SkillsForm data={resumeData.skills} onChange={(val) => updateField('skills', val)} />;
      case 'projects':
        return <ProjectsForm data={resumeData.projects} onChange={(val) => updateField('projects', val)} />;
      case 'internships':
        return <InternshipsForm data={resumeData.internships} onChange={(val) => updateField('internships', val)} />;
      case 'experience':
        return <WorkExperienceForm data={resumeData.workExperience} onChange={(val) => updateField('workExperience', val)} />;
      case 'certifications':
        return <CertificationsForm data={resumeData.certifications} onChange={(val) => updateField('certifications', val)} />;
      case 'achievements':
        return <AchievementsForm data={resumeData.achievements} onChange={(val) => updateField('achievements', val)} />;
      case 'languages':
        return <LanguagesForm data={resumeData.languages} onChange={(val) => updateField('languages', val)} />;
      default:
        return null;
    }
  };

  if (loading) return <LoadingSpinner text="Loading resume..." />;

  return (
    <div className="create-resume-page">
      <div className="container-fluid px-3 py-3">
        {/* Top Bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control fw-bold border-0 bg-transparent"
              style={{ fontSize: '1.25rem', maxWidth: '300px' }}
              value={resumeData?.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Resume Title"
            />
            {autoSaved && (
              <span className="badge bg-success d-flex align-items-center gap-1">
                <FaCheck size={10} /> Auto-saved
              </span>
            )}
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
              className="btn btn-outline-info btn-sm"
              onClick={() => navigate(`/preview/${id}`)}
            >
              <FaEye className="me-1" /> Full Preview
            </button>
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? <span className="spinner-border spinner-border-sm" /> : <FaSave />}
              Save
            </button>
          </div>
        </div>

        {/* Split Layout */}
        <div className="row g-3">
          {/* Form Side */}
          <div className="col-lg-6">
            <div className="form-panel rounded-4 p-3">
              <div className="section-tabs mb-3">
                <div className="d-flex flex-wrap gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`btn btn-sm ${activeTab === tab.key ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              {renderFormSection()}
            </div>
          </div>

          {/* Preview Side */}
          <div className="col-lg-6">
            <div className="preview-panel rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 fw-bold">
                  <FaEye className="me-2" /> Live Preview
                </h6>
                <span className="badge bg-success">{selectedTemplate}</span>
              </div>
              <div className="preview-scroll">
                <ResumePreview data={resumeData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResumePage;
