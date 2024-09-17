// styles.js
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    /* padding: 20px; */
    padding: 0px;
    margin: 0px;
    min-height: 100vh;
    background-color: #f8f9fa;
  }
`;

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  
  &:disabled {
    background-color: #aaa;
  }
`;

export const JobList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const JobItem = styled.li`
  background: #f1f1f1;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
`;

export const JobTitle = styled.h5`
  margin: 0;
`;

export const JobDetail = styled.p`
  margin: 5px 0;
`;
