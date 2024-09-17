import styled from "styled-components";
export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: #fff;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

export const JobCount = styled.h2`
  text-align: center;
  color: #343a40;
  font-size: 1.5rem;
  margin: 20px 0;
`;

export const ApplyButton = styled.button`
  display: ${(props) => (props.visible ? "block" : "none")};
  margin-bottom: 20px;
`;

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.disabled ? "#007bff" : "#fff")};
  color: ${(props) => (props.disabled ? "#fff" : "#007bff")};
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &.gray-background {
    background-color: gray;
    border: none;
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 20px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  &::placeholder {
    color: #adb5bd;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  &:hover::placeholder {
    opacity: 1;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
`;