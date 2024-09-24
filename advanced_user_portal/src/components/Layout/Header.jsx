import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/reducers/authSlice';

const HeaderWrapper = styled.div`
  background-color: #dbdbdb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 1000;
  /* margin-bottom: 20px; */
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  height: 70px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 0.5rem;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const PremiumButton = styled(Button)`
  background-color: #4CAF50;
  color: #fff;
  &:hover {
    background-color: #45a049;
  }
`;

const LoginButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
`;

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={toggleSidebar}>
          <Menu size={24} />
        </MenuButton>
        <LogoContainer to="/">
          <LogoImage src="https://res.cloudinary.com/dw5uzflen/image/upload/v1724923402/agh-logo1_cuz9ns_n7krtq.png" alt="Logo" />
        </LogoContainer>
        </LeftSection>
        <ActionContainer>
          <Link to="/notifications">
            <Bell size={20} />
<<<<<<< HEAD
          </Link>
          <PremiumButton>Premium</PremiumButton>
          {user ? (
            <LoginButton onClick={() => dispatch(logoutUser())}>Logout</LoginButton>
          ) : (
            <LoginButton onClick={goToLoginPage}>Login</LoginButton>
          )}
          <Link to="/edit-profile">
=======
          </Link>
          <PremiumButton>Premium</PremiumButton>
          {user ? (
            <LoginButton onClick={() => dispatch(logoutUser())}>Logout</LoginButton>
          ) : (
            <LoginButton onClick={goToLoginPage}>Login</LoginButton>
          )}
          <Link to="/edit-profile">
>>>>>>> 9175d83cc92621692fec8ca00b110eb7aaaad529
            <BsPersonCircle size={20} />
          </Link>
        </ActionContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;