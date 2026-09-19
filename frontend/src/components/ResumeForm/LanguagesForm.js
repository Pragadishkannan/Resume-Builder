import React, { useState } from 'react';
import { FaLanguage, FaPlus, FaTimes } from 'react-icons/fa';

const LanguagesForm = ({ data = [], onChange }) => {
  const [input, setInput] = useState('');

  const addLanguage = () => {
    const trimmed = input.trim();
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed]);
      setInput('');
    }
  };

  const removeLanguage = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLanguage();
    }
  };

  const commonLanguages = ['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada', 'Malayalam', 'French', 'German', 'Spanish'];

  return (
    <div className="form-section">
      <h5 className="form-section-title">
        <FaLanguage className="me-2 text-primary" /> Languages Known
      </h5>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type a language..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-outline-primary" onClick={addLanguage}>
          <FaPlus />
        </button>
      </div>

      {/* Quick add buttons */}
      <div className="mb-3">
        <small className="text-muted d-block mb-2">Quick add:</small>
        <div className="d-flex flex-wrap gap-1">
          {commonLanguages
            .filter((lang) => !data.includes(lang))
            .map((lang) => (
              <button
                key={lang}
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  if (!data.includes(lang)) {
                    onChange([...data, lang]);
                  }
                }}
              >
                + {lang}
              </button>
            ))}
        </div>
      </div>

      {/* Selected languages */}
      <div className="d-flex flex-wrap gap-2">
        {data.map((lang, index) => (
          <span
            key={index}
            className="badge bg-info bg-opacity-10 text-info d-flex align-items-center gap-1 px-3 py-2"
            style={{ fontSize: '0.85rem' }}
          >
            {lang}
            <FaTimes
              size={10}
              className="ms-1"
              onClick={() => removeLanguage(index)}
              style={{ cursor: 'pointer' }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default LanguagesForm;
