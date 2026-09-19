import React from 'react';
import { FaBullseye } from 'react-icons/fa';

const CareerObjectiveForm = ({ data, onChange }) => {
  return (
    <div className="form-section">
      <h5 className="form-section-title">
        <FaBullseye className="me-2 text-primary" /> Career Objective
      </h5>
      <div className="mb-3">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-control"
          rows="4"
          value={data || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling professional summary highlighting your key skills, experience, and career goals..."
        />
        <div className="form-text">
          {(data || '').length}/500 characters
        </div>
      </div>
    </div>
  );
};

export default CareerObjectiveForm;
