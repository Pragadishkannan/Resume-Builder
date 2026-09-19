import React from 'react';

const ATSTemplate = ({ data }) => {
  const info = data?.personalInfo || {};

  return (
    <div className="ats-template">
      {/* Header - Name and contact, plain text */}
      <div className="ats-header">
        <h1 className="ats-name">{info.fullName || 'YOUR NAME'}</h1>
        <div className="ats-contact">
          {[info.email, info.phone, info.address].filter(Boolean).join(' | ')}
        </div>
        <div className="ats-contact">
          {[info.linkedin, info.github, info.portfolio].filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Professional Summary */}
      {data?.careerObjective && (
        <div className="ats-section">
          <h2 className="ats-section-title">PROFESSIONAL SUMMARY</h2>
          <hr className="ats-hr" />
          <p className="ats-text">{data.careerObjective}</p>
        </div>
      )}

      {/* Education */}
      {data?.education?.length > 0 && (
        <div className="ats-section">
          <h2 className="ats-section-title">EDUCATION</h2>
          <hr className="ats-hr" />
          {data.education.map((edu, i) => (
            <div key={i} className="ats-entry">
              <div className="ats-entry-row">
                <strong>{edu.degree}</strong>
                <span>{edu.year}</span>
              </div>
              <div>{edu.college}{edu.university ? `, ${edu.university}` : ''}</div>
              {edu.cgpa && <div>CGPA: {edu.cgpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {data?.workExperience?.length > 0 && (
        <div className="ats-section">
          <h2 className="ats-section-title">WORK EXPERIENCE</h2>
          <hr className="ats-hr" />
          {data.workExperience.map((exp, i) => (
            <div key={i} className="ats-entry">
              <div className="ats-entry-row">
                <strong>{exp.designation}</strong>
                <span>{exp.duration}</span>
              </div>
              <div>{exp.company}</div>
              {exp.responsibilities && (
                <ul className="ats-list">
                  {exp.responsibilities.split('\n').filter(Boolean).map((r, j) => (
                    <li key={j}>{r.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Internships */}
      {data?.internships?.length > 0 && (
        <div className="ats-section">
          <h2 className="ats-section-title">INTERNSHIPS</h2>
          <hr className="ats-hr" />
          {data.internships.map((intern, i) => (
            <div key={i} className="ats-entry">
              <div className="ats-entry-row">
                <strong>{intern.role}</strong>
                <span>{intern.duration}</span>
              </div>
              <div>{intern.company}</div>
              {intern.description && <p className="ats-text">{intern.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <div className="ats-section">
          <h2 className="ats-section-title">PROJECTS</h2>
          <hr className="ats-hr" />
          {data.projects.map((proj, i) => (
            <div key={i} className="ats-entry">
              <strong>{proj.name}</strong>
              {proj.technologies && <div>Technologies: {proj.technologies}</div>}
              {proj.description && <p className="ats-text">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(data?.skills?.technical?.length > 0 || data?.skills?.soft?.length > 0) && (
        <div className="ats-section">
          <h2 className="ats-section-title">SKILLS</h2>
          <hr className="ats-hr" />
          {data.skills.technical?.length > 0 && (
            <div className="ats-entry">
              <strong>Technical Skills:</strong> {data.skills.technical.join(', ')}
            </div>
          )}
          {data.skills.soft?.length > 0 && (
            <div className="ats-entry">
              <strong>Soft Skills:</strong> {data.skills.soft.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Certifications */}
      {data?.certifications?.length > 0 && (
        <div className="ats-section">
          <h2 className="ats-section-title">CERTIFICATIONS</h2>
          <hr className="ats-hr" />
          <ul className="ats-list">
            {data.certifications.map((cert, i) => (
              <li key={i}>{cert.name}{cert.issuedBy ? ` — ${cert.issuedBy}` : ''}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {data?.achievements?.length > 0 && (
        <div className="ats-section">
          <h2 className="ats-section-title">ACHIEVEMENTS</h2>
          <hr className="ats-hr" />
          <ul className="ats-list">
            {data.achievements.map((ach, i) => (
              <li key={i}>{ach.title}{ach.description ? ` — ${ach.description}` : ''}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {data?.languages?.length > 0 && (
        <div className="ats-section">
          <h2 className="ats-section-title">LANGUAGES</h2>
          <hr className="ats-hr" />
          <div>{data.languages.join(', ')}</div>
        </div>
      )}
    </div>
  );
};

export default ATSTemplate;
