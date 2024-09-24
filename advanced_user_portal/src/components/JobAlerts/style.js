import styled from 'styled-components';
import Select from "react-select";

// Color palette
export const colors = {
  primary: '#3498db',
  primaryHover: '#2980b9',
  secondary: '#2ecc71',
  secondaryHover: '#27ae60',
  background: '#ecf0f1',
  cardBackground: '#ffffff',
  text: '#34495e',
  textLight: '#7f8c8d',
  border: '#bdc3c7',
  error: '#e74c3c',
};

// Styled components
export const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FormBellContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SetPreferencesForm = styled.div`
  flex: 1;
  margin-right: 2rem;
  background-color: ${colors.cardBackground};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

export const FormTitle = styled.h2`
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

export const InputFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.text};
  font-weight: bold;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const StyledSelect = styled(Select)`
  .react-select__control {
    border-color: ${colors.border};
  }

  .react-select__control--is-focused {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 1px ${colors.primary};
  }
`;

export const StyledButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export const BellIconContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${colors.error};
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
`;

export const AlertsPopup = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 300px;
  background-color: ${colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const AlertsPopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${colors.border};
`;

export const ClosePopupButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.textLight};
  font-size: 1.2rem;

  &:hover {
    color: ${colors.text};
  }
`;

export const AlertsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

export const PopupAlertItem = styled.li`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const ClearAllButton = styled(StyledButton)`
  width: 100%;
  background-color: ${colors.secondary};

  &:hover {
    background-color: ${colors.secondaryHover};
  }
`;

export const JobAlertsContainer = styled.div`
  margin-top: 2rem;
`;

export const AlertItem = styled.div`
  background-color: ${colors.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const AlertItemTitle = styled.h3`
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

export const AlertItemInfo = styled.p`
  margin: 0.25rem 0;
  color: ${colors.text};
`;

export const RemoveButton = styled(StyledButton)`
  background-color: ${colors.error};
  margin-top: 0.5rem;

  &:hover {
    background-color: ${colors.error}dd;
  }
`;

export const FormError = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const NoAlertsMessage = styled.p`
  color: ${colors.textLight};
  text-align: center;
  font-style: italic;
`;
