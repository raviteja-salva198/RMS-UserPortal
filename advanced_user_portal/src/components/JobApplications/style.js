import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

export const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  background-color: ${props => props.isActive ? '#3498db' : '#ecf0f1'};
  color: ${props => props.isActive ? 'white' : '#34495e'};
  font-weight: ${props => props.isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: ${props => props.isActive ? '#2980b9' : '#bdc3c7'};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #bdc3c7;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DateInput = styled(SearchInput)`
  width: 180px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormatToggle = styled.button`
  background-color: #ecf0f1;
  color:#000000;
  font-size:25px;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #bdc3c7;
    transform: rotate(90deg);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-bottom: 2rem;
`;

export const Th = styled.th`
  background-color: #34495e;
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-radius: 5px 5px 0 0;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;

export const Td = styled.td`
  padding: 1rem;
  background-color: white;
  border-bottom: 2px solid #ecf0f1;
  transition: all 0.3s ease;

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const GridCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const CardCompany = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #95a5a6;
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-weight: 600;
  font-size: 0.8rem;
  background-color: ${props => {
    switch (props.status) {
      case 'Accepted': return '#2ecc71';
      case 'Rejected': return '#e74c3c';
      case 'In Progress': return '#f39c12';
      default: return '#3498db';
    }
  }};
  color: white;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${props => props.isActive ? '#3498db' : '#ecf0f1'};
  color: ${props => props.isActive ? 'white' : '#34495e'};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: ${props => props.isActive ? '#2980b9' : '#bdc3c7'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NoApplicationsMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 2rem 0;
`;