import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (e) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-section">
      <h5 className="form-section-title">
        <FaUser className="me-2 text-primary" /> Personal Information
      </h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={data?.fullName || ''}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <FaEnvelope className="me-1 text-muted" /> Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={data?.email || ''}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <FaPhone className="me-1 text-muted" /> Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={data?.phone || ''}
            onChange={handleChange}
            placeholder="+91 9876543210"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <FaMapMarkerAlt className="me-1 text-muted" /> Address
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={data?.address || ''}
            onChange={handleChange}
            placeholder="City, State, Country"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <FaLinkedin className="me-1 text-muted" /> LinkedIn
          </label>
          <input
            type="url"
            className="form-control"
            name="linkedin"
            value={data?.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <FaGithub className="me-1 text-muted" /> GitHub
          </label>
          <input
            type="url"
            className="form-control"
            name="github"
            value={data?.github || ''}
            onChange={handleChange}
            placeholder="https://github.com/johndoe"
          />
        </div>
        <div className="col-12">
          <label className="form-label">
            <FaGlobe className="me-1 text-muted" /> Portfolio Website
          </label>
          <input
            type="url"
            className="form-control"
            name="portfolio"
            value={data?.portfolio || ''}
            onChange={handleChange}
            placeholder="https://johndoe.dev"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
