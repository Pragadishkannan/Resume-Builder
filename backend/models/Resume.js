const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a resume title'],
      trim: true,
      default: 'Untitled Resume',
    },
    template: {
      type: String,
      default: 'modern',
      enum: ['modern', 'professional', 'creative', 'ats-friendly'],
    },
    shareSlug: {
      type: String,
      unique: true,
      sparse: true,
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      portfolio: { type: String, default: '' },
      profilePhoto: { type: String, default: '' },
    },
    careerObjective: {
      type: String,
      default: '',
    },
    education: [
      {
        degree: { type: String, default: '' },
        college: { type: String, default: '' },
        university: { type: String, default: '' },
        year: { type: String, default: '' },
        cgpa: { type: String, default: '' },
      },
    ],
    skills: {
      technical: [{ type: String }],
      soft: [{ type: String }],
    },
    projects: [
      {
        name: { type: String, default: '' },
        technologies: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    internships: [
      {
        company: { type: String, default: '' },
        role: { type: String, default: '' },
        duration: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    workExperience: [
      {
        company: { type: String, default: '' },
        designation: { type: String, default: '' },
        duration: { type: String, default: '' },
        responsibilities: { type: String, default: '' },
      },
    ],
    certifications: [
      {
        name: { type: String, default: '' },
        issuedBy: { type: String, default: '' },
      },
    ],
    achievements: [
      {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    languages: [{ type: String }],
    downloadsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
