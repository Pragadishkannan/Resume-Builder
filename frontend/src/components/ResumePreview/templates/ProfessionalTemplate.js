import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const info = data?.personalInfo || {};

  return (
    <div className="professional-template">
      {/* Header */}
      <div className="prof-header">
        <h1 className="prof-name">{info.fullName || 'Your Name'}</h1>
        <div className="prof-contact-row">
          {info.email && <span>{info.email}</span>}
          {info.phone && <><span className="prof-sep">|</span><span>{info.phone}</span></>}
          {info.address && <><span className="prof-sep">|</span><span>{info.address}</span></>}
        </div>
        <div className="prof-contact-row">
          {info.linkedin && <span>{info.linkedin}</span>}
          {info.github && <><span className="prof-sep">|</span><span>{info.github}</span></>}
          {info.portfolio && <><span className="prof-sep">|</span><span>{info.portfolio}</span></>}
        </div>
      </div>

      {/* Career Objective */}
      {data?.careerObjective && (
        <div className="prof-section">
          <h2 className="prof-section-title">Professional Summary</h2>
          <div className="prof-divider"></div>
          <p className="prof-text">{data.careerObjective}</p>
        </div>
      )}

      {/* Education */}
      {data?.education?.length > 0 && (
        <div className="prof-section">
          <h2 className="prof-section-title">Education</h2>
          <div className="prof-divider"></div>
          {data.education.map((edu, i) => (
            <div key={i} className="prof-entry">
              <div className="prof-entry-row">
                <span className="prof-entry-title">{edu.degree}</span>
                <span className="prof-entry-date">{edu.year}</span>
              </div>
              <p className="prof-entry-sub">{edu.college}{edu.university ? `, ${edu.university}` : ''}</p>
              {edu.cgpa && <p className="prof-entry-detail">CGPA: {edu.cgpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {data?.workExperience?.length > 0 && (
        <div className="prof-section">
          <h2 className="prof-section-title">Work Experience</h2>
          <div className="prof-divider"></div>
          {data.workExperience.map((exp, i) => (
            <div key={i} className="prof-entry">
              <div className="prof-entry-row">
                <span className="prof-entry-title">{exp.designation}</span>
                <span className="prof-entry-date">{exp.duration}</span>
              </div>
              <p className="prof-entry-sub">{exp.company}</p>
              {exp.responsibilities && <p className="prof-entry-detail">{exp.responsibilities}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Internships */}
      {data?.internships?.length > 0 && (
        <div className="prof-section">
          <h2 className="prof-section-title">Internships</h2>
          <div className="prof-divider"></div>
          {data.internships.map((intern, i) => (
            <div key={i} className="prof-entry">
              <div className="prof-entry-row">
                <span className="prof-entry-title">{intern.role}</span>
                <span className="prof-entry-date">{intern.duration}</span>
              </div>
              <p className="prof-entry-sub">{intern.company}</p>
              {intern.description && <p className="prof-entry-detail">{intern.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <div className="prof-section">
          <h2 className="prof-section-title">Projects</h2>
          <div className="prof-divider"></div>
          {data.projects.map((proj, i) => (
            <div key={i} className="prof-entry">
              <span className="prof-entry-title">{proj.name}</span>
              {proj.technologies && <p className="prof-entry-tech">Technologies: {proj.technologies}</p>}
              {proj.description && <p className="prof-entry-detail">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(data?.skills?.technical?.length > 0 || data?.skills?.soft?.length > 0) && (
        <div className="prof-section">
          <h2 className="prof-section-title">Skills</h2>
          <div className="prof-divider"></div>
          {data.skills.technical?.length > 0 && (
            <p className="prof-text"><strong>Technical:</strong> {data.skills.technical.join(', ')}</p>
          )}
          {data.skills.soft?.length > 0 && (
            <p className="prof-text"><strong>Soft Skills:</strong> {data.skills.soft.join(', ')}</p>
          )}
        </div>
      )}

      {/* Certifications */}
      {data?.certifications?.length > 0 && (
        <div className="prof-section">
          <h2 className="prof-section-title">Certifications</h2>
          <div className="prof-divider"></div>
          {data.certifications.map((cert, i) => (
            <div key={i} className="prof-entry">
              <span className="prof-entry-title">{cert.name}</span>
              {cert.issuedBy && <span className="prof-entry-sub"> — {cert.issuedBy}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {data?.achievements?.length > 0 && (
        <div className="prof-section">
          <h2 className="prof-section-title">Achievements</h2>
          <div className="prof-divider"></div>
          <ul className="prof-list">
            {data.achievements.map((ach, i) => (
              <li key={i}>
                <strong>{ach.title}</strong>
                {ach.description && ` — ${ach.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {data?.languages?.length > 0 && (
        <div className="prof-section">
          <h2 className="prof-section-title">Languages</h2>
          <div className="prof-divider"></div>
          <p className="prof-text">{data.languages.join(' • ')}</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
