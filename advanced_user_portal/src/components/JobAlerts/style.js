import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;

export const FormBellContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const SetPreferencesForm = styled.div`
    flex: 1;
    margin-right: 20px;
  `;

export const FormGroup = styled.div`
    margin-bottom: 20px;
  `;

export const InputFieldsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;

export const BellIconContainer = styled.div`
    position: relative;
    cursor: pointer;
  `;

export const AlertsPopup = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;
export const AlertsPopupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;
export const ClosePopupButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `;
export const AlertsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `;
export const PopupAlertItem = styled.li `
    margin-bottom: 10px;
  `;
export const ClearAllButton = styled.button`
    background-color: #4CAF50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  `;
export const JobAlertsContainer = styled.div`
    margin-top: 40px;
`;
export const AlertItem = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
`;