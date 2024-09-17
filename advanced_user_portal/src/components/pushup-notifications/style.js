import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 40px;
  position: relative;

  @media (max-width: 600px) {
    padding: 10px;
    margin-top: 20px;
  }
`;

export const Heading = styled.h1`
  text-align: left;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionHeading = styled.h2`
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const StatusButton = styled.button`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
  }
`;

export const NotificationItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.type === "Job Alert"
      ? "#e6f7ff"
      : props.type === "Application Status"
      ? "#fff3e6"
      : "#e6ffe6"};
  border-left: 5px solid
    ${(props) =>
      props.type === "Job Alert"
        ? "#007bff"
        : props.type === "Application Status"
        ? "#ff9900"
        : "#33cc33"};
  border-radius: 4px;
  position: relative;

  p {
    margin: 5px 0;
  }
`;

export const ProfileSettings = styled.div`
  margin-top: 20px;
`;

export const PreferenceLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

export const ConfirmationMessage = styled.p`
  margin-top: 10px;
  color: green;
`;

export const SendButton = styled.button`
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const BellIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const NotificationCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 12px;
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.show ? "0" : "-400px")};
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 600px) {
    width: 100%;
    right: ${(props) => (props.show ? "0" : "-100%")};
  }
`;

export const SidebarHeading = styled.h2`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputField = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export const FilterButton = styled.button`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: ${(props) =>
    props.className === "active" ? "#007bff" : "#6c757d"};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.className === "active" ? "#0056b3" : "#5a6268"};
  }
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const RemoveIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  &:hover {
    color: #555;
  }
`;

export const ClearAllButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #c82333;
  }
`;