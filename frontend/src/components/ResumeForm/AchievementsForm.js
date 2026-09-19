import React from 'react';
import { FaTrophy, FaPlus, FaTrash } from 'react-icons/fa';

const AchievementsForm = ({ data = [], onChange }) => {
  const addAchievement = () => {
    onChange([...data, { title: '', description: '' }]);
  };

  const removeAchievement = (index) => {
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
          <FaTrophy className="me-2 text-primary" /> Achievements
        </h5>
        <button className="btn btn-sm btn-outline-primary" onClick={addAchievement}>
          <FaPlus className="me-1" /> Add
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-muted text-center py-3">No achievements added yet. Click "Add" to begin.</p>
      )}

      {data.map((ach, index) => (
        <div key={index} className="card mb-3 border-0 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">#{index + 1}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeAchievement(index)}>
                <FaTrash size={12} />
              </button>
            </div>
            <div className="row g-2">
              <div className="col-md-5">
                <input type="text" className="form-control form-control-sm"
                  placeholder="Award / Competition / Hackathon"
                  value={ach.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
              </div>
              <div className="col-md-7">
                <input type="text" className="form-control form-control-sm" placeholder="Description"
                  value={ach.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsForm;
