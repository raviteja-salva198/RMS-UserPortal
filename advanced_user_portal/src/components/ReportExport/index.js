import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

const ExportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
`;

const DropdownItem = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 14px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ReportExport = ({ data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleExportPDF = useCallback(async () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Date', 'Job Position', 'Status', 'Total Applications', 'Success Rate']],
      body: data.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.jobPosition,
        item.status,
        item.totalApplications,
        `${item.successRate ? item.successRate.toFixed(2) : 'N/A'}%`,
      ]),
    });

    const pieChart = document.getElementById('pieChart');
    const barChart = document.getElementById('barChart');

    const pieChartCanvas = await html2canvas(pieChart);
    const barChartCanvas = await html2canvas(barChart);

    const pieChartImage = pieChartCanvas.toDataURL('image/png');
    const barChartImage = barChartCanvas.toDataURL('image/png');

    doc.addPage();
    doc.addImage(pieChartImage, 'PNG', 10, 10, 200, 200);
    doc.addPage();
    doc.addImage(barChartImage, 'PNG', 10, 10, 200, 200);

    setIsDropdownOpen(false);
    doc.save('report.pdf');
  }, [data]);

  const handleExportExcel = useCallback(() => {
    const excelData = data.map(item => ({
      Date: new Date(item.date).toLocaleDateString(),
      'Job Position': item.jobPosition,
      Status: item.status,
      'Total Applications': item.totalApplications,
      'Success Rate': `${item.successRate ? item.successRate.toFixed(2) : 'N/A'}%`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'report.xlsx');
    setIsDropdownOpen(false);
  }, [data]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <ExportContainer>
      <Dropdown>
        <DropdownButton onClick={handleDropdownToggle} aria-expanded={isDropdownOpen}>
          Export Options
        </DropdownButton>
        <DropdownContent isOpen={isDropdownOpen}>
          <DropdownItem onClick={handleExportPDF}>Export PDF</DropdownItem>
          <DropdownItem onClick={handleExportExcel}>Export Excel</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </ExportContainer>
  );
};

ReportExport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalApplications: PropTypes.number.isRequired,
    successRate: PropTypes.number,
  })).isRequired,
};

export default ReportExport;
