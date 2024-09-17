import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.3s;
`;

export const SidebarIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;

  &.complete {
    background-color: green;
  }
`;

export const SidebarText = styled.div`
  font-size: 14px;
`;
