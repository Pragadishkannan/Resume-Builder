import React from 'react';
import { FaBuilding, FaPlus, FaTrash } from 'react-icons/fa';

const InternshipsForm = ({ data = [], onChange }) => {
  const addInternship = () => {
    onChange([...data, { company: '', role: '', duration: '', description: '' }]);
  };

  const removeInternship = (index) => {
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
          <FaBuilding className="me-2 text-primary" /> Internships
        </h5>
        <button className="btn btn-sm btn-outline-primary" onClick={addInternship}>
          <FaPlus className="me-1" /> Add
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-muted text-center py-3">No internships added yet. Click "Add" to begin.</p>
      )}

      {data.map((intern, index) => (
        <div key={index} className="card mb-3 border-0 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">#{index + 1}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeInternship(index)}>
                <FaTrash size={12} />
              </button>
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <input type="text" className="form-control form-control-sm" placeholder="Company Name"
                  value={intern.company} onChange={(e) => handleChange(index, 'company', e.target.value)} />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control form-control-sm" placeholder="Role/Position"
                  value={intern.role} onChange={(e) => handleChange(index, 'role', e.target.value)} />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control form-control-sm" placeholder="Duration (e.g., 3 months)"
                  value={intern.duration} onChange={(e) => handleChange(index, 'duration', e.target.value)} />
              </div>
              <div className="col-md-8">
                <textarea className="form-control form-control-sm" rows="2" placeholder="Description"
                  value={intern.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InternshipsForm;
