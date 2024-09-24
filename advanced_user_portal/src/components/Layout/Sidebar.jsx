import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Home, Briefcase, Award, FileText, Search, Bell, BarChart, FileCheck, FormInput, Edit3 } from 'lucide-react';
import { PiCertificateLight } from "react-icons/pi";

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? '250px' : '60px')};
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 90px 0 20px;
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
  transition: width 0.3s ease;
  z-index: 900;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    padding: ${({ isOpen }) => (isOpen ? '90px 0 20px' : '0')};
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover, &.active {
    background-color: #34495e;
  }

  svg {
    margin-right: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  }

  span {
    display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
    white-space: nowrap;
  }
`;

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const menuItems = [
    { path: '/', icon: <Home />, label: 'Home' },
    { path: '/job-search', icon: <Search />, label: 'Job Search' },
    { path: '/job-matching', icon: <Briefcase />, label: 'Job Matching' },
    { path: '/skill-ranking', icon: <BarChart />, label: 'Skill Ranking' },
    { path: '/exam-home', icon: <Award />, label: 'Certifications' },
    { path: '/job-reports', icon: <FileText />, label: 'Job Reports' },
    { path: '/application-reports', icon: <FileCheck />, label: 'Application Reports' },
    { path: '/job-alert', icon: <Bell />, label: 'Job Alerts' },
    { path: '/registration-form', icon: <Edit3 />, label: 'Registration' },
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarNav>
        {menuItems.map((item) => (
          <SidebarLink
            key={item.path}
            to={item.path}
            isOpen={isOpen}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.icon}
            <span>{item.label}</span>
          </SidebarLink>
        ))}
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;