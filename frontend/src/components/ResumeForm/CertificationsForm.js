import React from 'react';
import { FaCertificate, FaPlus, FaTrash } from 'react-icons/fa';

const CertificationsForm = ({ data = [], onChange }) => {
  const addCertification = () => {
    onChange([...data, { name: '', issuedBy: '' }]);
  };

  const removeCertification = (index) => {
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
          <FaCertificate className="me-2 text-primary" /> Certifications
        </h5>
        <button className="btn btn-sm btn-outline-primary" onClick={addCertification}>
          <FaPlus className="me-1" /> Add
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-muted text-center py-3">No certifications added yet. Click "Add" to begin.</p>
      )}

      {data.map((cert, index) => (
        <div key={index} className="card mb-3 border-0 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">#{index + 1}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeCertification(index)}>
                <FaTrash size={12} />
              </button>
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <input type="text" className="form-control form-control-sm" placeholder="Certificate Name"
                  value={cert.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control form-control-sm" placeholder="Issued By"
                  value={cert.issuedBy} onChange={(e) => handleChange(index, 'issuedBy', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsForm;
