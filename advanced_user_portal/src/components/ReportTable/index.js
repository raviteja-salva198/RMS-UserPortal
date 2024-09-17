import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 12px 15px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  text-align: center;
  font-size: 14px;

  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const Tr = styled.tr`
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const HeaderRow = styled.tr`
  background-color: #007bff;
  color: #ffffff;
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #000;
  pointer-events: none;
  transform: translate(-50%, -100%);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  font-size: 16px;
  color: #333;
`;

const ReportTable = ({ data, setSortConfig, sortConfig }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });

  const handleMouseEnter = (event, content) => {
    setTooltip({ visible: true, x: event.clientX, y: event.clientY, content });
  };

  const handleMouseMove = (event) => {
    setTooltip((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: '' });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        const nextDirection =
          prev.direction === 'ascending'
            ? 'descending'
            : prev.direction === 'descending'
            ? 'default'
            : 'ascending';
        return { key, direction: nextDirection };
      }
      return { key, direction: 'ascending' };
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key || sortConfig.direction === 'default') {
      return <FaSort />;
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <TableContainer>
      {data.length === 0 ? (
        <MessageContainer>
          <p>Sorry we were not able to find a match with your filter</p>
          <p style={{fontWeight:"bolder"}}>Please check your filters</p>
        </MessageContainer>
      ) : (
        <>
          <Table>
            <thead>
              <HeaderRow>
                <Th onClick={() => handleSort('date')}>
                  Date {renderSortIcon('date')}
                </Th>
                <Th onClick={() => handleSort('jobPosition')}>
                  Job Position {renderSortIcon('jobPosition')}
                </Th>
                <Th onClick={() => handleSort('status')}>
                  Status {renderSortIcon('status')}
                </Th>
                <Th onClick={() => handleSort('totalApplications')}>
                  Total Applications {renderSortIcon('totalApplications')}
                </Th>
                <Th onClick={() => handleSort('successRate')}>
                  Success Rate (%) {renderSortIcon('successRate')}
                </Th>
              </HeaderRow>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <Tr key={index}>
                  <Td>{new Date(row.date).toLocaleDateString()}</Td>
                  <Td>{row.jobPosition}</Td>
                  <Td>{row.status}</Td>
                  <Td>{row.totalApplications}</Td>
                  <Td
                    onMouseEnter={(e) => handleMouseEnter(e, `Success Rate: ${row.successRate ? row.successRate.toFixed(2) : 'N/A'}`)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    {row.successRate ? row.successRate.toFixed(2) : 'N/A'}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <Tooltip style={{ top: tooltip.y, left: tooltip.x }} visible={tooltip.visible}>
          Success Rate= (Total Number of Applications / Number of Accepted Applications) × 100
          </Tooltip>
        </>
      )}
    </TableContainer>
  );
};

ReportTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalApplications: PropTypes.number.isRequired,
    successRate: PropTypes.number,
  })).isRequired,
  setSortConfig: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['ascending', 'descending', 'default']).isRequired,
  }).isRequired,
};

export default ReportTable;
