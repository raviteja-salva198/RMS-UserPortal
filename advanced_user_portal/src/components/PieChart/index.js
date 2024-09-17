import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

Chart.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PieChart = ({ data }) => {
  const statusCounts = data.reduce(
    (acc, application) => {
      acc[application.status] = (acc[application.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Accepted: 0, Rejected: 0 }
  );

  const chartData = {
    labels: ['Pending', 'Accepted', 'Rejected'],
    datasets: [
      {
        data: [statusCounts.Pending, statusCounts.Accepted, statusCounts.Rejected],
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <ChartContainer id="pieChart">
      <Pie data={chartData} aria-label="Pie chart showing status distribution of applications" />
    </ChartContainer>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PieChart;
