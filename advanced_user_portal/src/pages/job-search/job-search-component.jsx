import React, { useState, useEffect } from "react";
import Filters from "../../components/Filters";
import JobList from "../../components/JobList";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThreeDots } from "react-loader-spinner";
import {
  Header,
  HeaderTitle,
  JobCount,
  ApplyButton,
  PaginationButton,
  SearchInput,
  LoaderContainer,
} from "./style";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const JobSearch = () => {
  const [search, setSearch] = useState({
    keyword: "",
    jobType: [],
  });

  const [selectedJobs, setSelectedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const [jobs, setJobs] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleJobTypeChange = (e) => {
    const { value, checked } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      jobType: checked
        ? [...prevSearch.jobType, value]
        : prevSearch.jobType.filter((type) => type !== value),
    }));
  };

  const handleJobSelection = (job) => {
    setSelectedJobs((prevSelectedJobs) =>
      prevSelectedJobs.includes(job)
        ? prevSelectedJobs?.filter((selectedJob) => selectedJob !== job)
        : [...prevSelectedJobs, job]
    );
  };

  const handleApply = (job) => {
    console.log(`Applying for ${job.title} at ${job.company}`);
  };

  const handleApplySelected = () => {
    selectedJobs.forEach((job) => {
      console.log(`Applying for ${job.title} at ${job.company}`);
    });
  };

  const handleApplyAll = () => {
    filteredJobs.forEach((job) => {
      console.log(`Applying for ${job.title} at ${job.company}`);
    });
  };

  const filteredJobs = jobs?.filter((job) => {
    return (
      (job.title.toLowerCase().includes(search.keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(search.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(search.keyword.toLowerCase()) ||
        job.location.toLowerCase().includes(search.keyword.toLowerCase())) &&
      (search.jobType.length === 0 || search.jobType.includes(job.jobType))
    );
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setSelectedJobs([]);
  }, [search]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setApiStatus(apiStatusConstants.inProgress);
        const queryString = new URLSearchParams(search).toString();
        const response = await fetch(
          "http://localhost:23000/api/v1" + `/user/jobs?${queryString}`
        );
        const data = await response.json();
        setJobs(data);
        setApiStatus(apiStatusConstants.success);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setApiStatus(apiStatusConstants.failure);
      }
    };

    fetchJobs();
  }, [search]);

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#0b69ff"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </LoaderContainer>
  );

  const renderSuccessView = () => {
    return (
      <>
        <JobCount>Featured Jobs</JobCount>
        <JobList
          jobs={currentJobs}
          selectedJobs={selectedJobs}
          handleJobSelection={handleJobSelection}
          handleApply={handleApply}
        />
        <ApplyButton
          visible={selectedJobs.length > 0}
          onClick={handleApplySelected}
          className="btn btn-primary"
        >
          Apply Selected
        </ApplyButton>
        <ApplyButton
          visible={filteredJobs.length > 0}
          onClick={handleApplyAll}
          className="btn btn-secondary"
        >
          Apply All
        </ApplyButton>
        <div className="d-flex justify-content-center mt-4">
          <PaginationButton
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "gray-background" : ""}
          >
            {"<"}
          </PaginationButton>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationButton
              key={index}
              onClick={() => paginate(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </PaginationButton>
          ))}
          <PaginationButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "gray-background" : ""}
          >
            {">"}
          </PaginationButton>
        </div>
      </>
    );
  };

  const renderFailureView = () => (
    <h1>Failed to load data. Please try again later.</h1>
  );

  const renderReportPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress: {
        return renderLoadingView();
      }
      case apiStatusConstants.success: {
        return renderSuccessView();
      }
      case apiStatusConstants.failure: {
        return renderFailureView();
      }
    }
  };

  return (
    <div className="container row py-4 mx-auto">
      <Header>
        <HeaderTitle>{filteredJobs.length} Jobs Found</HeaderTitle>
      </Header>
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <SearchInput
            type="text"
            name="keyword"
            placeholder="Search for jobs, companies, or locations"
            value={search.keyword}
            onChange={handleInputChange}
            className="form-control"
          />
          <Filters search={search} handleJobTypeChange={handleJobTypeChange} />
        </div>
        <div className="col-lg-9 col-md-8">{renderReportPage()}</div>
      </div>
    </div>
  );
};

export default JobSearch;
