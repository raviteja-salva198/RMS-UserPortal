import React, { useState, useEffect, useMemo } from "react";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { FiList } from "react-icons/fi";
import { GrPrevious, GrNext } from "react-icons/gr";
import { appliedJobsList, initialFilterButtons, ITEMS_PER_PAGE } from "./data";
import { Container, Title, PageButton, PaginationContainer, GridCard, CardTitle, CardCompany, CardInfo, StatusBadge, NoApplicationsMessage, Td, GridContainer, Th, FormatToggle, Table, FilterContainer, FilterButton, SearchContainer, SearchInput, DateInput } from "./style";

const JobApplicationsComponent = () => {
  const [filterButtons, setFilterButtons] = useState(initialFilterButtons);
  const [isGridFormat, setIsGridFormat] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilter = useMemo(
    () => filterButtons.find((button) => button.isActive)?.buttonText || "All",
    [filterButtons]
  );

  const filteredJobs = useMemo(
    () =>
      appliedJobsList.filter((job) => {
        const matchesFilter =
          activeFilter === "All" || job.applicationStatus === activeFilter;
        const matchesSearch =
          job.companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
          job.jobPosition.toLowerCase().includes(searchInput.toLowerCase());

        let matchesDate = true;
        if (dateInput) {
          const jobDate = new Date(
            job.dateApplied.split("/").reverse().join("-")
          );
          const inputDate = new Date(dateInput);
          matchesDate = jobDate.toDateString() === inputDate.toDateString();
        }

        return matchesFilter && matchesSearch && matchesDate;
      }),
    [activeFilter, searchInput, dateInput]
  );

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchInput, dateInput]);

  const handleFilterChange = (buttonId) => {
    setFilterButtons((prevButtons) =>
      prevButtons.map((button) => ({
        ...button,
        isActive: button.buttonId === buttonId,
      }))
    );
  };

  const handleFormatToggle = () => setIsGridFormat((prev) => !prev);
  const handleSearchInput = (e) => setSearchInput(e.target.value);
  const handleDateInput = (e) => setDateInput(e.target.value);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderFilterButtons = () => (
    <FilterContainer>
      {filterButtons.map(({ buttonId, buttonText, isActive }) => (
        <FilterButton
          key={buttonId}
          isActive={isActive}
          onClick={() => handleFilterChange(buttonId)}
        >
          {buttonText}
        </FilterButton>
      ))}
    </FilterContainer>
  );

  const renderSearchAndFormatToggle = () => (
    <SearchContainer>
      <SearchInput
        type="search"
        placeholder="Search by company name or job role"
        onChange={handleSearchInput}
        value={searchInput}
      />
      <DateInput
        type="date"
        onChange={handleDateInput}
        value={dateInput}
      />
      <FormatToggle onClick={handleFormatToggle}>
        {isGridFormat ? <FiList size={24} /> : <TfiLayoutGrid2 size={24} />}
      </FormatToggle>
    </SearchContainer>
  );

  const renderTableFormat = () => (
    <Table>
      <thead>
        <tr>
          <Th>Job Position</Th>
          <Th>Company Name</Th>
          <Th>Date Applied</Th>
          <Th>Application Status</Th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map(
            ({
              id,
              jobPosition,
              companyName,
              dateApplied,
              applicationStatus,
            }) => (
              <tr key={id}>
                <Td>{jobPosition}</Td>
                <Td>{companyName}</Td>
                <Td>{dateApplied}</Td>
                <Td>
                  <StatusBadge status={applicationStatus}>
                    {applicationStatus}
                  </StatusBadge>
                </Td>
              </tr>
            )
          )
        ) : (
          <tr>
            <Td colSpan="4">
              <NoApplicationsMessage>No applications found.</NoApplicationsMessage>
            </Td>
          </tr>
        )}
      </tbody>
    </Table>
  );

  const renderGridFormat = () => (
    <GridContainer>
      {currentItems.length > 0 ? (
        currentItems.map(
          ({
            id,
            jobPosition,
            companyName,
            applicationStatus,
            dateApplied,
          }) => (
            <GridCard key={id}>
              <CardTitle>{jobPosition}</CardTitle>
              <CardCompany>{companyName}</CardCompany>
              <CardInfo>
                <StatusBadge status={applicationStatus}>
                  {applicationStatus}
                </StatusBadge>
                <span>{dateApplied}</span>
              </CardInfo>
            </GridCard>
          )
        )
      ) : (
        <NoApplicationsMessage>No applications found.</NoApplicationsMessage>
      )}
    </GridContainer>
  );

  const renderPagination = () => (
    <PaginationContainer>
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GrPrevious />
      </PageButton>
      {[...Array(totalPages)].map((_, i) => (
        <PageButton
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          isActive={currentPage === i + 1}
        >
          {i + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <GrNext />
      </PageButton>
    </PaginationContainer>
  );

  return (
    <Container>
      <Title>My Applications</Title>
      {renderFilterButtons()}
      {renderSearchAndFormatToggle()}
      {isGridFormat ? renderGridFormat() : renderTableFormat()}
      {filteredJobs.length > 0 && renderPagination()}
    </Container>
  );
};

export default JobApplicationsComponent;








// import React, { useState, useEffect, useMemo } from "react";
// import styled from "styled-components";
// import { TfiLayoutGrid2 } from "react-icons/tfi";
// import { FiList } from "react-icons/fi";
// import { GrPrevious, GrNext } from "react-icons/gr";
// import { appliedJobsList, initialFilterButtons, ITEMS_PER_PAGE } from "./data";

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
//   font-family: 'Arial', sans-serif;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: #333;
//   margin-bottom: 2rem;
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const FilterButton = styled.button`
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 20px;
//   background-color: ${props => props.isActive ? '#007bff' : '#f0f0f0'};
//   color: ${props => props.isActive ? 'white' : '#333'};
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: ${props => props.isActive ? '#0056b3' : '#e0e0e0'};
//   }
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const SearchInput = styled.input`
//   flex: 1;
//   padding: 0.5rem;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const DateInput = styled(SearchInput)`
//   width: 150px;
// `;

// const FormatToggle = styled.button`
//   background-color: #f0f0f0;
//   border: none;
//   border-radius: 4px;
//   padding: 0.5rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-bottom: 2rem;
// `;

// const Th = styled.th`
//   background-color: #f0f0f0;
//   padding: 1rem;
//   text-align: left;
//   font-weight: bold;
// `;

// const Td = styled.td`
//   padding: 1rem;
//   border-bottom: 1px solid #e0e0e0;
// `;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 2rem;
//   margin-bottom: 2rem;
// `;

// const GridCard = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//   }
// `;

// const CardTitle = styled.h3`
//   font-size: 1.2rem;
//   color: #333;
//   margin-bottom: 0.5rem;
// `;

// const CardCompany = styled.p`
//   font-size: 1rem;
//   color: #666;
//   margin-bottom: 1rem;
// `;

// const CardInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 0.9rem;
//   color: #888;
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
// `;

// const PageButton = styled.button`
//   padding: 0.5rem 1rem;
//   border: 1px solid #ccc;
//   background-color: ${props => props.isActive ? '#007bff' : 'white'};
//   color: ${props => props.isActive ? 'white' : '#333'};
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: ${props => props.isActive ? '#0056b3' : '#f0f0f0'};
//   }

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const JobApplicationsComponent = () => {
//   const [filterButtons, setFilterButtons] = useState(initialFilterButtons);
//   const [isGridFormat, setIsGridFormat] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [dateInput, setDateInput] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const activeFilter = useMemo(
//     () => filterButtons.find((button) => button.isActive)?.buttonText || "All",
//     [filterButtons]
//   );

//   const filteredJobs = useMemo(
//     () =>
//       appliedJobsList.filter((job) => {
//         const matchesFilter =
//           activeFilter === "All" || job.applicationStatus === activeFilter;
//         const matchesSearch =
//           job.companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
//           job.jobPosition.toLowerCase().includes(searchInput.toLowerCase());

//         let matchesDate = true;
//         if (dateInput) {
//           const jobDate = new Date(
//             job.dateApplied.split("/").reverse().join("-")
//           );
//           const inputDate = new Date(dateInput);
//           matchesDate = jobDate.toDateString() === inputDate.toDateString();
//         }

//         return matchesFilter && matchesSearch && matchesDate;
//       }),
//     [activeFilter, searchInput, dateInput]
//   );

//   const currentItems = useMemo(() => {
//     const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//     const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//     return filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
//   }, [filteredJobs, currentPage]);

//   const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeFilter, searchInput, dateInput]);

//   const handleFilterChange = (buttonId) => {
//     setFilterButtons((prevButtons) =>
//       prevButtons.map((button) => ({
//         ...button,
//         isActive: button.buttonId === buttonId,
//       }))
//     );
//   };

//   const handleFormatToggle = () => setIsGridFormat((prev) => !prev);
//   const handleSearchInput = (e) => setSearchInput(e.target.value);
//   const handleDateInput = (e) => setDateInput(e.target.value);
//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//   const renderFilterButtons = () => (
//     <FilterContainer>
//       {filterButtons.map(({ buttonId, buttonText, isActive }) => (
//         <FilterButton
//           key={buttonId}
//           isActive={isActive}
//           onClick={() => handleFilterChange(buttonId)}
//         >
//           {buttonText}
//         </FilterButton>
//       ))}
//     </FilterContainer>
//   );

//   const renderSearchAndFormatToggle = () => (
//     <SearchContainer>
//       <SearchInput
//         type="search"
//         placeholder="Search by company name or job role"
//         onChange={handleSearchInput}
//         value={searchInput}
//       />
//       <DateInput
//         type="date"
//         onChange={handleDateInput}
//         value={dateInput}
//       />
//       <FormatToggle onClick={handleFormatToggle}>
//         {isGridFormat ? <FiList size={20} /> : <TfiLayoutGrid2 size={20} />}
//       </FormatToggle>
//     </SearchContainer>
//   );

//   const renderTableFormat = () => (
//     <Table>
//       <thead>
//         <tr>
//           <Th>Job Position</Th>
//           <Th>Company Name</Th>
//           <Th>Date Applied</Th>
//           <Th>Application Status</Th>
//         </tr>
//       </thead>
//       <tbody>
//         {currentItems.length > 0 ? (
//           currentItems.map(
//             ({
//               id,
//               jobPosition,
//               companyName,
//               dateApplied,
//               applicationStatus,
//             }) => (
//               <tr key={id}>
//                 <Td>{jobPosition}</Td>
//                 <Td>{companyName}</Td>
//                 <Td>{dateApplied}</Td>
//                 <Td>{applicationStatus}</Td>
//               </tr>
//             )
//           )
//         ) : (
//           <tr>
//             <Td colSpan="4">No applications found.</Td>
//           </tr>
//         )}
//       </tbody>
//     </Table>
//   );

//   const renderGridFormat = () => (
//     <GridContainer>
//       {currentItems.length > 0 ? (
//         currentItems.map(
//           ({
//             id,
//             jobPosition,
//             companyName,
//             applicationStatus,
//             dateApplied,
//           }) => (
//             <GridCard key={id}>
//               <CardTitle>{jobPosition}</CardTitle>
//               <CardCompany>{companyName}</CardCompany>
//               <CardInfo>
//                 <span>{applicationStatus}</span>
//                 <span>{dateApplied}</span>
//               </CardInfo>
//             </GridCard>
//           )
//         )
//       ) : (
//         <div>No applications found.</div>
//       )}
//     </GridContainer>
//   );

//   const renderPagination = () => (
//     <PaginationContainer>
//       <PageButton
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <GrPrevious />
//       </PageButton>
//       {[...Array(totalPages)].map((_, i) => (
//         <PageButton
//           key={i + 1}
//           onClick={() => handlePageChange(i + 1)}
//           isActive={currentPage === i + 1}
//         >
//           {i + 1}
//         </PageButton>
//       ))}
//       <PageButton
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         <GrNext />
//       </PageButton>
//     </PaginationContainer>
//   );

//   return (
//     <Container>
//       <Title>My Applications</Title>
//       {renderFilterButtons()}
//       {renderSearchAndFormatToggle()}
//       {isGridFormat ? renderGridFormat() : renderTableFormat()}
//       {filteredJobs.length > 0 && renderPagination()}
//     </Container>
//   );
// };

// export default JobApplicationsComponent;