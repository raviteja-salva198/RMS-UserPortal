import Select from "react-select";
import Creatable from "react-select/creatable";
import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

export const RadioButtons = styled.div`
  display: flex;
  gap: 20px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CheckboxGroup = styled(RadioGroup)``;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledSelect = styled(Select)`
  .react-select__control {
    border-color: #ddd;
  }
  .react-select__control:hover {
    border-color: #007bff;
  }
  .react-select__control--is-focused {
    box-shadow: 0 0 0 1px #007bff;
    border-color: #007bff;
  }
`;

export const StyledCreatable = styled(Creatable)`
  .react-select__control {
    border-color: #ddd;
  }
  .react-select__control:hover {
    border-color: #007bff;
  }
  .react-select__control--is-focused {
    box-shadow: 0 0 0 1px #007bff;
    border-color: #007bff;
  }
`;
