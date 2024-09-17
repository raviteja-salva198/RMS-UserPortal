import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ReportFilters from "../../components/ReportFilter";
import ReportTable from "../../components/ReportTable";
import ReportExport from "../../components/ReportExport";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import { Container, Row, Col, Button } from "react-bootstrap";
import debounce from "lodash/debounce";
import { ToastContainer, toast } from "react-toastify";

const DashboardContainer = styled(Container)`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PaginationButton = styled(Button)`
  margin: 0 5px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ReportDashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: "", end: "" },
    jobPosition: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });
  const itemsPerPage = 10;

  const fetchData = useCallback(
    debounce(async (newFilters = filters) => {
      try {
        setApiStatus(apiStatusConstants.inProgress);
        const { dateRange, jobPosition, status } = newFilters;
        const response = await axios.get(
          "http://localhost:23000/api/v1" + "/user/applications",
          {
            params: {
              start: dateRange.start,
              end: dateRange.end,
              jobPosition,
              status,
            },
          }
        );

        const { applications } = response.data;

        const successRates = applications.reduce((acc, application) => {
          const position = application.jobPosition;
          if (!acc[position]) {
            acc[position] = { accepted: 0, total: 0 };
          }
          if (application.status === "Accepted") {
            acc[position].accepted += 1;
          }
          acc[position].total += 1;
          return acc;
        }, {});

        const calculatedData = applications.map((application) => {
          const position = application.jobPosition;
          const successRate =
            (successRates[position].accepted / successRates[position].total) *
            100;
          return { ...application, successRate };
        });

        setData(calculatedData);
        setTotalPages(Math.ceil(calculatedData.length / itemsPerPage));
        setApiStatus(apiStatusConstants.success);
      } catch (err) {
        console.error("Error fetching data:", err);
        setApiStatus(apiStatusConstants.failure);
      }
    }, 500),
    [filters]
  );

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    fetchData(filters);
  }, [fetchData, filters]);

  const resetFilters = useCallback(() => {
    const defaultFilters = {
      dateRange: { start: "", end: "" },
      jobPosition: "",
      status: "",
    };
    setFilters(defaultFilters);
    setSortConfig({ key: "", direction: "default" });
    setCurrentPage(1);
    fetchData(defaultFilters);
  }, [fetchData]);

  const handleDateChange = useCallback((start, end) => {
    const today = new Date().toISOString().split("T")[0];

    if (start && end) {
      if (new Date(start) > new Date(end)) {
        toast.error("Start date cannot be later than end date.");
        start = "";
        end = "";
      } else if (new Date(end) > new Date(today)) {
        toast.error("End date cannot be in the future.");
        end = today;
      }
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: { start, end },
    }));
  }, []);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationButton
          key={i}
          variant={i === currentPage ? "primary" : "outline-primary"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }
    return pages;
  };

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

  const sortData = (data, config) => {
    const sortedData = [...data];
    if (config.direction === "default") {
      return sortedData;
    }

    sortedData.sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === "ascending" ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const sortedData = sortData(data, sortConfig);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderSuccessView = () => (
    <ReportTable
      data={paginatedData}
      setSortConfig={setSortConfig}
      sortConfig={sortConfig}
    />
  );

  const renderFailureView = () => (
    <h1>Failed to load data. Please try again later.</h1>
  );

  const renderReportPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <DashboardContainer fluid>
      <Title>Application Reports</Title>
      <ReportFilters
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        handleDateChange={handleDateChange}
      />
      {renderReportPage()}
      <ReportExport data={sortedData} />
      {data.length > 0 && (
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline-primary"
            >
              &lt;
            </PaginationButton>
            {renderPageNumbers()}
            <PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline-primary"
            >
              &gt;
            </PaginationButton>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={6} sm={12} className="mb-4 mt-4">
          <PieChart data={sortedData} />
        </Col>
        <Col md={6} sm={12} className="mb-4 mt-4">
          <BarChart data={sortedData} />
        </Col>
      </Row>
      <ToastContainer />
    </DashboardContainer>
  );
};

export default ReportDashboard;
