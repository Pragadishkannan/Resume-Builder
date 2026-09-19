const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Template = require('../models/Template');

dotenv.config();

const templates = [
  {
    name: 'Modern Template',
    slug: 'modern',
    description:
      'A clean, contemporary design with accent colors and modern typography. Perfect for tech and creative professionals.',
    thumbnail: '/templates/modern.png',
    isActive: true,
  },
  {
    name: 'Professional Template',
    slug: 'professional',
    description:
      'A traditional, polished layout with classic formatting. Ideal for corporate and business roles.',
    thumbnail: '/templates/professional.png',
    isActive: true,
  },
  {
    name: 'Creative Template',
    slug: 'creative',
    description:
      'A bold, eye-catching design with vibrant colors and unique layouts. Great for designers and artists.',
    thumbnail: '/templates/creative.png',
    isActive: true,
  },
  {
    name: 'ATS-Friendly Template',
    slug: 'ats-friendly',
    description:
      'A simple, clean format optimized for Applicant Tracking Systems. Best for job applications that go through automated screening.',
    thumbnail: '/templates/ats.png',
    isActive: true,
  },
];

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing templates
    await Template.deleteMany({});
    console.log('Existing templates cleared.');

    // Insert new templates
    await Template.insertMany(templates);
    console.log('Templates seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedTemplates();
