import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportButton: React.FC = () => {
  const exportPDF = async () => {
    const element = document.body;
    const canvas = await html2canvas(element);
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, 140);
    pdf.save('dashboard-report.pdf');
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={exportPDF}
        className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButton;
