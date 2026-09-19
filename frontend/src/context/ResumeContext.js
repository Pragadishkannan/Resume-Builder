import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

const emptyResume = {
  title: 'Untitled Resume',
  template: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    profilePhoto: '',
  },
  careerObjective: '',
  education: [],
  skills: { technical: [], soft: [] },
  projects: [],
  internships: [],
  workExperience: [],
  certifications: [],
  achievements: [],
  languages: [],
};

export const ResumeProvider = ({ children }) => {
  const [currentResume, setCurrentResume] = useState({ ...emptyResume });
  const [resumes, setResumes] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [saving, setSaving] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const autoSaveTimer = useRef(null);

  // Auto-save with debounce
  const autoSave = useCallback(
    (id, data) => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
      autoSaveTimer.current = setTimeout(async () => {
        if (id) {
          try {
            setSaving(true);
            await api.updateResume(id, data);
            setSaving(false);
          } catch (error) {
            setSaving(false);
            console.error('Auto-save error:', error);
          }
        }
      }, 2000);
    },
    []
  );

  const updateCurrentResume = useCallback(
    (field, value) => {
      setCurrentResume((prev) => {
        const updated = { ...prev, [field]: value };
        if (resumeId) {
          autoSave(resumeId, updated);
        }
        return updated;
      });
    },
    [resumeId, autoSave]
  );

  const loadResume = useCallback(async (id) => {
    try {
      const { data } = await api.getResumeById(id);
      setCurrentResume(data);
      setResumeId(data._id);
      setSelectedTemplate(data.template || 'modern');
      return data;
    } catch (error) {
      toast.error('Failed to load resume');
      throw error;
    }
  }, []);

  const fetchResumes = useCallback(async (search = '') => {
    try {
      const { data } = await api.getResumes(search);
      setResumes(data);
      return data;
    } catch (error) {
      toast.error('Failed to fetch resumes');
      throw error;
    }
  }, []);

  const saveResume = useCallback(
    async () => {
      try {
        setSaving(true);
        if (resumeId) {
          const { data } = await api.updateResume(resumeId, currentResume);
          setSaving(false);
          toast.success('Resume saved successfully');
          return data;
        } else {
          const { data } = await api.createResume(currentResume);
          setResumeId(data._id);
          setSaving(false);
          toast.success('Resume created successfully');
          return data;
        }
      } catch (error) {
        setSaving(false);
        toast.error('Failed to save resume');
        throw error;
      }
    },
    [resumeId, currentResume]
  );

  const resetResume = useCallback(() => {
    setCurrentResume({ ...emptyResume });
    setResumeId(null);
    setSelectedTemplate('modern');
  }, []);

  const changeTemplate = useCallback(
    (template) => {
      setSelectedTemplate(template);
      setCurrentResume((prev) => {
        const updated = { ...prev, template };
        if (resumeId) {
          autoSave(resumeId, updated);
        }
        return updated;
      });
    },
    [resumeId, autoSave]
  );

  return (
    <ResumeContext.Provider
      value={{
        currentResume,
        setCurrentResume,
        updateCurrentResume,
        resumes,
        selectedTemplate,
        setSelectedTemplate,
        saving,
        resumeId,
        setResumeId,
        loadResume,
        fetchResumes,
        saveResume,
        resetResume,
        changeTemplate,
        emptyResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
