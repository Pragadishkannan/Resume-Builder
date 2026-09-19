import React from 'react';
import { FaBriefcase, FaPlus, FaTrash } from 'react-icons/fa';

const WorkExperienceForm = ({ data = [], onChange }) => {
  const addExperience = () => {
    onChange([...data, { company: '', designation: '', duration: '', responsibilities: '' }]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  return (
    <div className="form-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="form-section-title mb-0">
          <FaBriefcase className="me-2 text-primary" /> Work Experience
        </h5>
        <button className="btn btn-sm btn-outline-primary" onClick={addExperience}>
          <FaPlus className="me-1" /> Add
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-muted text-center py-3">No work experience added yet. Click "Add" to begin.</p>
      )}

      {data.map((exp, index) => (
        <div key={index} className="card mb-3 border-0 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">#{index + 1}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeExperience(index)}>
                <FaTrash size={12} />
              </button>
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <input type="text" className="form-control form-control-sm" placeholder="Company"
                  value={exp.company} onChange={(e) => handleChange(index, 'company', e.target.value)} />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control form-control-sm" placeholder="Designation"
                  value={exp.designation} onChange={(e) => handleChange(index, 'designation', e.target.value)} />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control form-control-sm" placeholder="Duration"
                  value={exp.duration} onChange={(e) => handleChange(index, 'duration', e.target.value)} />
              </div>
              <div className="col-md-8">
                <textarea className="form-control form-control-sm" rows="2" placeholder="Responsibilities"
                  value={exp.responsibilities} onChange={(e) => handleChange(index, 'responsibilities', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceForm;
