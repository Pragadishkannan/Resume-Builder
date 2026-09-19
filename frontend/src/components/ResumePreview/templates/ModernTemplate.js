import React from 'react';

const ModernTemplate = ({ data }) => {
  const info = data?.personalInfo || {};
  const hasContact = info.email || info.phone || info.address;
  const hasLinks = info.linkedin || info.github || info.portfolio;

  return (
    <div className="modern-template">
      <div className="modern-header">
        <div className="modern-header-content">
          {info.profilePhoto && (
            <div className="modern-photo-wrapper">
              <img
                src={info.profilePhoto.startsWith('http') ? info.profilePhoto : `http://localhost:5000${info.profilePhoto}`}
                alt={info.fullName}
                className="modern-photo"
              />
            </div>
          )}
          <div className="modern-name-block">
            <h1 className="modern-name">{info.fullName || 'Your Name'}</h1>
            {data?.careerObjective && (
              <p className="modern-objective">{data.careerObjective}</p>
            )}
          </div>
        </div>
      </div>

      <div className="modern-body">
        {/* Sidebar */}
        <div className="modern-sidebar">
          {/* Contact */}
          {hasContact && (
            <div className="modern-section">
              <h3 className="modern-section-title">Contact</h3>
              {info.email && <p className="modern-contact-item">📧 {info.email}</p>}
              {info.phone && <p className="modern-contact-item">📱 {info.phone}</p>}
              {info.address && <p className="modern-contact-item">📍 {info.address}</p>}
            </div>
          )}

          {/* Links */}
          {hasLinks && (
            <div className="modern-section">
              <h3 className="modern-section-title">Links</h3>
              {info.linkedin && <p className="modern-contact-item">🔗 {info.linkedin}</p>}
              {info.github && <p className="modern-contact-item">💻 {info.github}</p>}
              {info.portfolio && <p className="modern-contact-item">🌐 {info.portfolio}</p>}
            </div>
          )}

          {/* Skills */}
          {(data?.skills?.technical?.length > 0 || data?.skills?.soft?.length > 0) && (
            <div className="modern-section">
              <h3 className="modern-section-title">Skills</h3>
              {data.skills.technical?.length > 0 && (
                <>
                  <p className="modern-skill-label">Technical</p>
                  <div className="modern-skills-list">
                    {data.skills.technical.map((skill, i) => (
                      <span key={i} className="modern-skill-tag">{skill}</span>
                    ))}
                  </div>
                </>
              )}
              {data.skills.soft?.length > 0 && (
                <>
                  <p className="modern-skill-label mt-2">Soft Skills</p>
                  <div className="modern-skills-list">
                    {data.skills.soft.map((skill, i) => (
                      <span key={i} className="modern-skill-tag soft">{skill}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Languages */}
          {data?.languages?.length > 0 && (
            <div className="modern-section">
              <h3 className="modern-section-title">Languages</h3>
              {data.languages.map((lang, i) => (
                <p key={i} className="modern-contact-item">• {lang}</p>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="modern-main">
          {/* Education */}
          {data?.education?.length > 0 && (
            <div className="modern-section">
              <h3 className="modern-section-title">Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="modern-entry">
                  <div className="modern-entry-header">
                    <strong>{edu.degree}</strong>
                    <span className="modern-year">{edu.year}</span>
                  </div>
                  <p className="modern-entry-sub">{edu.college}{edu.university ? `, ${edu.university}` : ''}</p>
                  {edu.cgpa && <p className="modern-entry-detail">CGPA: {edu.cgpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Work Experience */}
          {data?.workExperience?.length > 0 && (
            <div className="modern-section">
              <h3 className="modern-section-title">Work Experience</h3>
              {data.workExperience.map((exp, i) => (
                <div key={i} className="modern-entry">
                  <div className="modern-entry-header">
                    <strong>{exp.designation}</strong>
                    <span className="modern-year">{exp.duration}</span>
                  </div>
                  <p className="modern-entry-sub">{exp.company}</p>
                  {exp.responsibilities && <p className="modern-entry-detail">{exp.responsibilities}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Internships */}
          {data?.internships?.length > 0 && (
            <div className="modern-section">
              <h3 className="modern-section-title">Internships</h3>
              {data.internships.map((intern, i) => (
                <div key={i} className="modern-entry">
                  <div className="modern-entry-header">
                    <strong>{intern.role}</strong>
                    <span className="modern-year">{intern.duration}</span>
                  </div>
                  <p className="modern-entry-sub">{intern.company}</p>
                  {intern.description && <p className="modern-entry-detail">{intern.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data?.projects?.length > 0 && (
            <div className="modern-section">
              <h3 className="modern-section-title">Projects</h3>
              {data.projects.map((proj, i) => (
                <div key={i} className="modern-entry">
                  <strong>{proj.name}</strong>
                  {proj.technologies && (
                    <p className="modern-entry-tech">{proj.technologies}</p>
                  )}
                  {proj.description && <p className="modern-entry-detail">{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data?.certifications?.length > 0 && (
            <div className="modern-section">
              <h3 className="modern-section-title">Certifications</h3>
              {data.certifications.map((cert, i) => (
                <div key={i} className="modern-entry">
                  <strong>{cert.name}</strong>
                  {cert.issuedBy && <p className="modern-entry-sub">Issued by: {cert.issuedBy}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {data?.achievements?.length > 0 && (
            <div className="modern-section">
              <h3 className="modern-section-title">Achievements</h3>
              {data.achievements.map((ach, i) => (
                <div key={i} className="modern-entry">
                  <strong>{ach.title}</strong>
                  {ach.description && <p className="modern-entry-detail">{ach.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
