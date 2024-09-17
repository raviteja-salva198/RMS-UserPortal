import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const JobContainer = styled.div`
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 15px;
  flex-grow: 1;
  transition: all 0.3s ease;
  background-color: #fff;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const JobDetails = styled.div`
  margin-left: 10px;
`;

const JobTitle = styled.h3`
  margin-bottom: 5px;
  color: #007bff;
  font-weight: bold;
`;

const JobCompany = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
  color: #343a40;
`;

const JobLocation = styled.p`
  color: #6c757d;
  margin-bottom: 5px;
`;

const JobDescription = styled.p`
  margin-bottom: 5px;
  color: #495057;
`;

const JobType = styled.p`
  font-style: italic;
  margin-bottom: 0;
  color: #6c757d;
`;

const ApplyButton = styled.button`
  margin-top: 10px;
`;

const NoJobsMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #6c757d;
  margin-top: 20px;
`;

const JobList = ({ jobs, selectedJobs, handleJobSelection, handleApply }) => {
  return (
    <div className="container">
      {jobs.length === 0 ? (
        <NoJobsMessage>No jobs available at the moment.</NoJobsMessage>
      ) : (
        <div className="row">
          {jobs.map((job, index) => (
            <div className="col-12 col-md-6 mb-4" key={index}>
              <JobItem className="d-flex align-items-start">
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job)}
                  onChange={() => handleJobSelection(job)}
                  className="me-3 mt-2"
                />
                <JobContainer>
                  <JobDetails>
                    <JobTitle>{job.title}</JobTitle>
                    <JobCompany>{job.company}</JobCompany>
                    <JobLocation>{job.location}</JobLocation>
                    <JobDescription>{job.description}</JobDescription>
                    <JobType>{job.jobType}</JobType>
                    <ApplyButton className="btn btn-primary" onClick={() => handleApply(job)}>
                      Apply
                    </ApplyButton>
                  </JobDetails>
                </JobContainer>
              </JobItem>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
