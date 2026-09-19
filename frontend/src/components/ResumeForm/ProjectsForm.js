import React from 'react';
import { FaProjectDiagram, FaPlus, FaTrash } from 'react-icons/fa';

const ProjectsForm = ({ data = [], onChange }) => {
  const addProject = () => {
    onChange([...data, { name: '', technologies: '', description: '' }]);
  };

  const removeProject = (index) => {
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
          <FaProjectDiagram className="me-2 text-primary" /> Projects
        </h5>
        <button className="btn btn-sm btn-outline-primary" onClick={addProject}>
          <FaPlus className="me-1" /> Add
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-muted text-center py-3">No projects added yet. Click "Add" to begin.</p>
      )}

      {data.map((project, index) => (
        <div key={index} className="card mb-3 border-0 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">#{index + 1}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeProject(index)}>
                <FaTrash size={12} />
              </button>
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control form-control-sm"
                  rows="2"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;
