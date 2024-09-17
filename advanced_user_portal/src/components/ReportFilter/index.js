import React, { useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: all 0.3s;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: all 0.3s;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  height: fit-content;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const ReportFilters = ({ filters, setFilters, applyFilters, resetFilters, handleDateChange }) => {
  const { start, end } = filters.dateRange;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  return (
    <FilterContainer>
      <InputContainer>
        <Label htmlFor="start">Start Date</Label>
        <Input
          type="date"
          id="start"
          name="start"
          value={start}
          onChange={(e) => handleDateChange(e.target.value, end)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="end">End Date</Label>
        <Input
          type="date"
          id="end"
          name="end"
          value={end}
          onChange={(e) => handleDateChange(start, e.target.value)}
          min={start}
          max={new Date().toISOString().split('T')[0]}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="jobPosition">Job Position</Label>
        <Select
          id="jobPosition"
          name="jobPosition"
          value={filters.jobPosition}
          onChange={handleChange}
        >
          <option value="">All Positions</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </Select>
      </InputContainer>
      <InputContainer>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </Select>
      </InputContainer>
      <ButtonContainer>
        <Button onClick={resetFilters} type="button">Reset Filters</Button>
      </ButtonContainer>
    </FilterContainer>
  );
};

export default ReportFilters;
