import React from 'react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
      <div className="spinner-grow text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="text-muted fw-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
