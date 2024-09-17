import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BarChart = ({ data }) => {
  const positions = [...new Set(data.map((app) => app.jobPosition))];
  const counts = positions.map((position) => data.filter((app) => app.jobPosition === position).length);

  const chartData = {
    labels: positions,
    datasets: [
      {
        label: 'Number of Applications',
        data: counts,
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <ChartContainer id="barChart">
      <Bar data={chartData} aria-label="Bar chart showing number of applications per job position" />
    </ChartContainer>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      jobPosition: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BarChart;
