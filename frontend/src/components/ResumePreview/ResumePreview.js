import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ATSTemplate from './templates/ATSTemplate';

const templates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  'ats-friendly': ATSTemplate,
};

const ResumePreview = ({ data, template = 'modern' }) => {
  const TemplateComponent = templates[template] || ModernTemplate;

  return (
    <div className="resume-preview-wrapper">
      <div id="resume-preview-content" className="resume-preview-content">
        <TemplateComponent data={data} />
      </div>
    </div>
  );
};

export default ResumePreview;
