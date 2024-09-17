import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBarContainer = styled.div`
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

const Filters = ({ search, handleJobTypeChange }) => {
  return (
    <SearchBarContainer className="container">
      <p style={{ fontWeight: "bolder", marginBottom: "0px" }}>Select Job Type</p>
      <CheckboxContainer className="row">
        {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((type) => (
          <CheckboxLabel key={type} className="col-12 col-md-6">
            <input
              type="checkbox"
              name="jobType"
              value={type}
              checked={search.jobType.includes(type)}
              onChange={handleJobTypeChange}
              className="form-check-input"
            />
            {type}
          </CheckboxLabel>
        ))}
      </CheckboxContainer>
    </SearchBarContainer>
  );
};

export default Filters;
