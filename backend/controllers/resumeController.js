const Resume = require('../models/Resume');
const { v4: uuidv4 } = require('uuid');

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user._id,
      title: req.body.title || 'Untitled Resume',
      template: req.body.template || 'modern',
      shareSlug: uuidv4().slice(0, 8),
      personalInfo: req.body.personalInfo || {},
      careerObjective: req.body.careerObjective || '',
      education: req.body.education || [],
      skills: req.body.skills || { technical: [], soft: [] },
      projects: req.body.projects || [],
      internships: req.body.internships || [],
      workExperience: req.body.workExperience || [],
      certifications: req.body.certifications || [],
      achievements: req.body.achievements || [],
      languages: req.body.languages || [],
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all resumes for current user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { user: req.user._id };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const resumes = await Resume.find(query).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    const updateFields = [
      'title',
      'template',
      'personalInfo',
      'careerObjective',
      'education',
      'skills',
      'projects',
      'internships',
      'workExperience',
      'certifications',
      'achievements',
      'languages',
    ];

    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    });

    const updatedResume = await resume.save();
    res.json(updatedResume);
  } catch (error) {
    console.error('Update resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
const duplicateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const duplicated = await Resume.create({
      user: req.user._id,
      title: `${resume.title} (Copy)`,
      template: resume.template,
      shareSlug: uuidv4().slice(0, 8),
      personalInfo: resume.personalInfo,
      careerObjective: resume.careerObjective,
      education: resume.education,
      skills: resume.skills,
      projects: resume.projects,
      internships: resume.internships,
      workExperience: resume.workExperience,
      certifications: resume.certifications,
      achievements: resume.achievements,
      languages: resume.languages,
    });

    res.status(201).json(duplicated);
  } catch (error) {
    console.error('Duplicate resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get shared resume by slug (public)
// @route   GET /api/resumes/shared/:slug
// @access  Public
const getSharedResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ shareSlug: req.params.slug });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get shared resume error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Increment download count
// @route   PUT /api/resumes/:id/download
// @access  Private
const incrementDownload = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.downloadsCount = (resume.downloadsCount || 0) + 1;
    await resume.save();

    res.json({ downloadsCount: resume.downloadsCount });
  } catch (error) {
    console.error('Increment download error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
  getSharedResume,
  incrementDownload,
};
