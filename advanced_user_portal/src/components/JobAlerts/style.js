import styled, { css } from 'styled-components';

// Color palette
const colors = {
  primary: '#0056b3',
  primaryHover: '#004494',
  secondary: '#6c757d',
  secondaryHover: '#5a6268',
  background: '#ffffff',
  backgroundAlt: '#f8f9fa',
  backgroundHover: '#e9ecef',
  text: '#333333',
  textLight: '#6c757d',
  border: '#dee2e6',
  error: '#dc3545',
};

// Spacing
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

// Shadows
const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.05)',
  medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
  large: '0 8px 16px rgba(0, 0, 0, 0.15)',
};

// Typography
const typography = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: {
    small: '14px',
    medium: '16px',
    large: '18px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
};

// Mixins
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const cardStyle = css`
  background-color: ${colors.background};
  border-radius: 8px;
  box-shadow: ${shadows.medium};
`;

// Components
export const Container = styled.div`
  max-width: 1200px;
  margin: ${spacing.xxl} auto;
  padding: ${spacing.xl};
  ${cardStyle}
`;

export const FormBellContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.xl};
`;

export const SetPreferencesForm = styled.div`
  flex: 1;
  margin-right: ${spacing.xl};
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

export const InputFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.lg};
`;

export const BellIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Updated: Improved positioning and styling for AlertsPopup
export const AlertsPopup = styled.div`
  ${cardStyle}
  position: absolute;
  top: 40px;
  right: 0;
  padding: ${spacing.lg};
  width: 350px;
  z-index: 1000;
  border: 1px solid ${colors.border};
`;

export const AlertsPopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.sm};
  border-bottom: 1px solid ${colors.border};
`;

export const ClosePopupButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: ${typography.fontSize.medium};
  color: ${colors.textLight};
  transition: color 0.2s ease;

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

// Updated: Improved styling for PopupAlertItem
export const PopupAlertItem = styled.li`
  margin-bottom: ${spacing.sm};
  padding: ${spacing.md};
  background-color: ${colors.backgroundAlt};
  border-radius: 6px;
  transition: background-color 0.2s ease;
  font-size: ${typography.fontSize.small};

  &:hover {
    background-color: ${colors.backgroundHover};
  }
`;

// Updated: Enhanced styling for ClearAllButton
export const ClearAllButton = styled.button`
  ${flexCenter}
  width: 100%;
  background-color: ${colors.secondary};
  color: ${colors.background};
  border: none;
  border-radius: 4px;
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${typography.fontSize.small};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: ${spacing.md};

  &:hover {
    background-color: ${colors.secondaryHover};
  }
`;

export const JobAlertsContainer = styled.div`
  margin-top: ${spacing.xl};
`;

// Updated: Improved styling for AlertItem
export const AlertItem = styled.div`
  margin-bottom: ${spacing.md};
  padding: ${spacing.lg};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  background-color: ${colors.background};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`;

// Updated: Enhanced styling for StyledButton
export const StyledButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.background};
  border: none;
  border-radius: 4px;
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${typography.fontSize.medium};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Updated: Improved styling for input fields
export const StyledInput = styled.input`
  width: 100%;
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: ${typography.fontSize.medium};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
  }
`;

// Updated: Enhanced styling for select fields
export const StyledSelect = styled.select`
  width: 100%;
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: ${typography.fontSize.medium};
  background-color: ${colors.background};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${spacing.md} center;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
  }
`;

// Updated: Improved styling for NotificationBadge
export const NotificationBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: ${colors.error};
  color: ${colors.background};
  border-radius: 50%;
  padding: 2px 6px;
  font-size: ${typography.fontSize.small};
  font-weight: ${typography.fontWeight.bold};
  min-width: 18px;
  height: 18px;
  ${flexCenter}
`;

// Updated: Enhanced styling for FormError
export const FormError = styled.p`
  color: ${colors.error};
  font-size: ${typography.fontSize.small};
  margin-top: ${spacing.xs};
  font-weight: ${typography.fontWeight.medium};
`;

// Updated: Improved styling for NoAlertsMessage
export const NoAlertsMessage = styled.p`
  color: ${colors.textLight};
  font-style: italic;
  text-align: center;
  padding: ${spacing.md};
`;