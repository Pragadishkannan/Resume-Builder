import React from 'react';
import { FaGraduationCap, FaPlus, FaTrash } from 'react-icons/fa';

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    onChange([...data, { degree: '', college: '', university: '', year: '', cgpa: '' }]);
  };

  const removeEducation = (index) => {
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
          <FaGraduationCap className="me-2 text-primary" /> Education
        </h5>
        <button className="btn btn-sm btn-outline-primary" onClick={addEducation}>
          <FaPlus className="me-1" /> Add
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-muted text-center py-3">No education added yet. Click "Add" to begin.</p>
      )}

      {data.map((edu, index) => (
        <div key={index} className="card mb-3 border-0 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">#{index + 1}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeEducation(index)}
              >
                <FaTrash size={12} />
              </button>
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Degree (e.g., B.Tech, MBA)"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="College Name"
                  value={edu.college}
                  onChange={(e) => handleChange(index, 'college', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="University"
                  value={edu.university}
                  onChange={(e) => handleChange(index, 'university', e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleChange(index, 'year', e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="CGPA"
                  value={edu.cgpa}
                  onChange={(e) => handleChange(index, 'cgpa', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
