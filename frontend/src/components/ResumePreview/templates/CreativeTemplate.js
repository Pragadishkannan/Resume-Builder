import React from 'react';

const CreativeTemplate = ({ data }) => {
  const info = data?.personalInfo || {};

  return (
    <div className="creative-template">
      {/* Header with photo */}
      <div className="creative-header">
        {info.profilePhoto && (
          <div className="creative-photo-wrapper">
            <img
              src={info.profilePhoto.startsWith('http') ? info.profilePhoto : `http://localhost:5000${info.profilePhoto}`}
              alt={info.fullName}
              className="creative-photo"
            />
          </div>
        )}
        <div className="creative-header-text">
          <h1 className="creative-name">{info.fullName || 'Your Name'}</h1>
          <div className="creative-contact-grid">
            {info.email && <span className="creative-contact">✉ {info.email}</span>}
            {info.phone && <span className="creative-contact">☎ {info.phone}</span>}
            {info.address && <span className="creative-contact">⌂ {info.address}</span>}
            {info.linkedin && <span className="creative-contact">in {info.linkedin}</span>}
            {info.github && <span className="creative-contact">⌨ {info.github}</span>}
            {info.portfolio && <span className="creative-contact">⊕ {info.portfolio}</span>}
          </div>
        </div>
      </div>

      {/* Objective */}
      {data?.careerObjective && (
        <div className="creative-section">
          <div className="creative-section-header">
            <span className="creative-icon">🎯</span>
            <h2>About Me</h2>
          </div>
          <p className="creative-text">{data.careerObjective}</p>
        </div>
      )}

      <div className="creative-two-col">
        {/* Left Column */}
        <div className="creative-col-left">
          {/* Skills */}
          {(data?.skills?.technical?.length > 0 || data?.skills?.soft?.length > 0) && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">⚡</span>
                <h2>Skills</h2>
              </div>
              {data.skills.technical?.length > 0 && (
                <div className="mb-2">
                  <p className="creative-label">Technical</p>
                  <div className="creative-tags">
                    {data.skills.technical.map((skill, i) => (
                      <span key={i} className="creative-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft?.length > 0 && (
                <div>
                  <p className="creative-label">Soft Skills</p>
                  <div className="creative-tags">
                    {data.skills.soft.map((skill, i) => (
                      <span key={i} className="creative-tag soft">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {data?.languages?.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">🌍</span>
                <h2>Languages</h2>
              </div>
              <div className="creative-tags">
                {data.languages.map((lang, i) => (
                  <span key={i} className="creative-tag lang">{lang}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data?.certifications?.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">📜</span>
                <h2>Certifications</h2>
              </div>
              {data.certifications.map((cert, i) => (
                <div key={i} className="creative-item">
                  <strong>{cert.name}</strong>
                  {cert.issuedBy && <p className="creative-sub">{cert.issuedBy}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {data?.achievements?.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">🏆</span>
                <h2>Achievements</h2>
              </div>
              {data.achievements.map((ach, i) => (
                <div key={i} className="creative-item">
                  <strong>{ach.title}</strong>
                  {ach.description && <p className="creative-sub">{ach.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="creative-col-right">
          {/* Education */}
          {data?.education?.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">🎓</span>
                <h2>Education</h2>
              </div>
              {data.education.map((edu, i) => (
                <div key={i} className="creative-timeline-item">
                  <div className="creative-timeline-dot"></div>
                  <div className="creative-timeline-content">
                    <strong>{edu.degree}</strong>
                    <p className="creative-sub">{edu.college}{edu.university ? `, ${edu.university}` : ''}</p>
                    <div className="creative-meta">
                      {edu.year && <span>{edu.year}</span>}
                      {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Work Experience */}
          {data?.workExperience?.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">💼</span>
                <h2>Experience</h2>
              </div>
              {data.workExperience.map((exp, i) => (
                <div key={i} className="creative-timeline-item">
                  <div className="creative-timeline-dot"></div>
                  <div className="creative-timeline-content">
                    <strong>{exp.designation}</strong>
                    <p className="creative-sub">{exp.company} • {exp.duration}</p>
                    {exp.responsibilities && <p className="creative-text-sm">{exp.responsibilities}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Internships */}
          {data?.internships?.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">🚀</span>
                <h2>Internships</h2>
              </div>
              {data.internships.map((intern, i) => (
                <div key={i} className="creative-timeline-item">
                  <div className="creative-timeline-dot"></div>
                  <div className="creative-timeline-content">
                    <strong>{intern.role}</strong>
                    <p className="creative-sub">{intern.company} • {intern.duration}</p>
                    {intern.description && <p className="creative-text-sm">{intern.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data?.projects?.length > 0 && (
            <div className="creative-section">
              <div className="creative-section-header">
                <span className="creative-icon">🔧</span>
                <h2>Projects</h2>
              </div>
              {data.projects.map((proj, i) => (
                <div key={i} className="creative-item">
                  <strong>{proj.name}</strong>
                  {proj.technologies && <p className="creative-tech">{proj.technologies}</p>}
                  {proj.description && <p className="creative-text-sm">{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
