import styled from 'styled-components';
import { Check, X, AlertCircle } from 'lucide-react';

export const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f5f5f5;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PlanCard = styled.div`
  background-color: ${props => props.color};
  border-radius: 10px;
  width: 300px;
  padding: 1.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const PlanTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
`;

export const PlanSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  opacity: 0.8;
`;

export const PlanPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
`;

export const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 15px;
`;
//font-size: 0.9rem;
export const Button = styled.button`
  background-color: white;
  color: ${props => props.color};
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${props => props.color};
    color: white;
  }
`;

export const IconWrapper = styled.span`
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${props => props.included ? '#73FC02' : '#FE0303'};
`;

export const CustomAlert = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

export const AlertIcon = styled(AlertCircle)`
  margin-right: 10px;
`;
