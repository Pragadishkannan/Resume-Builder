import React, { useState } from 'react';
import { FaLaptopCode, FaPlus, FaTimes } from 'react-icons/fa';

const SkillsForm = ({ data = { technical: [], soft: [] }, onChange }) => {
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const addSkill = (type, input, setInput) => {
    const trimmed = input.trim();
    if (trimmed && !data[type].includes(trimmed)) {
      onChange({
        ...data,
        [type]: [...data[type], trimmed],
      });
      setInput('');
    }
  };

  const removeSkill = (type, index) => {
    onChange({
      ...data,
      [type]: data[type].filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e, type, input, setInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(type, input, setInput);
    }
  };

  return (
    <div className="form-section">
      <h5 className="form-section-title">
        <FaLaptopCode className="me-2 text-primary" /> Skills
      </h5>

      {/* Technical Skills */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Technical Skills</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="e.g., React.js, Python, MongoDB"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'technical', techInput, setTechInput)}
          />
          <button
            className="btn btn-outline-primary"
            onClick={() => addSkill('technical', techInput, setTechInput)}
          >
            <FaPlus />
          </button>
        </div>
        <div className="mt-2 d-flex flex-wrap gap-2">
          {data.technical.map((skill, index) => (
            <span
              key={index}
              className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1 px-3 py-2"
              style={{ fontSize: '0.85rem' }}
            >
              {skill}
              <FaTimes
                size={10}
                className="ms-1 cursor-pointer"
                onClick={() => removeSkill('technical', index)}
                style={{ cursor: 'pointer' }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <label className="form-label fw-semibold">Soft Skills</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Leadership, Communication"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'soft', softInput, setSoftInput)}
          />
          <button
            className="btn btn-outline-primary"
            onClick={() => addSkill('soft', softInput, setSoftInput)}
          >
            <FaPlus />
          </button>
        </div>
        <div className="mt-2 d-flex flex-wrap gap-2">
          {data.soft.map((skill, index) => (
            <span
              key={index}
              className="badge bg-success bg-opacity-10 text-success d-flex align-items-center gap-1 px-3 py-2"
              style={{ fontSize: '0.85rem' }}
            >
              {skill}
              <FaTimes
                size={10}
                className="ms-1"
                onClick={() => removeSkill('soft', index)}
                style={{ cursor: 'pointer' }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
