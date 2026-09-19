import React, { useRef } from 'react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const PDFDownloadButton = ({ resumeId, fileName = 'resume' }) => {
  const downloading = useRef(false);

  const handleDownload = async () => {
    if (downloading.current) return;
    downloading.current = true;

    try {
      // Dynamic import html2pdf
      const html2pdf = (await import('html2pdf.js')).default;

      const element = document.getElementById('resume-preview-content');
      if (!element) {
        toast.error('Resume preview not found');
        downloading.current = false;
        return;
      }

      toast.info('Generating PDF, please wait...');

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
      };

      await html2pdf().set(opt).from(element).save();

      // Increment download count
      if (resumeId) {
        await api.incrementDownload(resumeId);
      }

      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF download error:', error);
      toast.error('Failed to generate PDF');
    } finally {
      downloading.current = false;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="d-flex gap-2">
      <button
        className="btn btn-primary d-flex align-items-center gap-2"
        onClick={handleDownload}
        id="downloadPdfBtn"
      >
        <FaDownload /> Download PDF
      </button>
      <button
        className="btn btn-outline-secondary d-flex align-items-center gap-2"
        onClick={handlePrint}
        id="printBtn"
      >
        <FaPrint /> Print
      </button>
    </div>
  );
};

export default PDFDownloadButton;
