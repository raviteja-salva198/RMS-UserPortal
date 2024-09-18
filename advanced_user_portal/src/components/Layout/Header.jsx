import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/reducers/authSlice';


const HeaderWrapper = styled.div`
  background-color: #dbdbdb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.header`
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  height: 70px;
  
  @media (max-width: 1240px) {
    padding: 0.75rem 2rem;
  }

  @media (max-width: 1023px) {
    flex-wrap: wrap;
    height: auto;
  }
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

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavDesktop = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
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

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: none;

  @media (max-width: 1023px) {
    display: block;
  }
`;

const NavMobile = styled.nav`
  background-color: #ffffff;
  padding: 1rem;
  width: 100%;
  display: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 1023px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const goToLoginPage = () => {
    navigate('/login');
  }

  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer to="/">
          <LogoImage src="https://res.cloudinary.com/dw5uzflen/image/upload/v1724923402/agh-logo1_cuz9ns_n7krtq.png" alt="Logo" />
        </LogoContainer>

        <NavContainer>
          <NavDesktop>
            <NavLink to="/skill-ranking">Skill Ranking</NavLink>
            <NavLink to="/job-matching">Job Matching</NavLink>
            <NavLink to="/exclusive-jobs">Exclusive Jobs</NavLink>
            <NavLink to="/job-reports">Job Reports</NavLink>
            <NavLink to="/application-reports">Application Reports</NavLink>
            <NavLink to="/job-search">Job Search</NavLink>
            <NavLink to="/job-alert">Job Alert</NavLink>
          </NavDesktop>
        </NavContainer>

        <ActionContainer>
          <NavLink to="/notifications">
            <Bell size={20} />
          </NavLink>
          <PremiumButton>Premium</PremiumButton>
         { user ? <LoginButton onClick={() => {
          dispatch(logoutUser())
         }}>Logout</LoginButton> : <LoginButton onClick={goToLoginPage}>Login</LoginButton>}
        </ActionContainer>

        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>

        <NavMobile $isOpen={isMenuOpen}>
          <MobileNavLink to="/skill-ranking" onClick={toggleMenu}>Skill Ranking</MobileNavLink>
          <MobileNavLink to="/job-matching" onClick={toggleMenu}>Job Matching</MobileNavLink>
          <MobileNavLink to="/exclusive-jobs" onClick={toggleMenu}>Exclusive Jobs</MobileNavLink>
          <MobileNavLink to="/job-reports" onClick={toggleMenu}>Job Reports</MobileNavLink>
          <MobileNavLink to="/application-reports" onClick={toggleMenu}>Application Reports</MobileNavLink>
          <MobileNavLink to="/job-search" onClick={toggleMenu}>Job Search</MobileNavLink>
          <MobileNavLink to="/job-alert" onClick={toggleMenu}>Job Alert</MobileNavLink>
          <MobileNavLink to="/notifications" onClick={toggleMenu}>Notifications</MobileNavLink>
        </NavMobile>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;


// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { Bell, Menu, X } from 'lucide-react';

// const HeaderWrapper = styled.div`
//   background-color: #dbdbdb;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const HeaderContainer = styled.header`
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
//   height: 74px;
  
//   @media (max-width: 1240px) {
//     padding: 1rem 2rem;
//   }

//   @media (max-width: 768px) {
//     flex-direction: column;
//     height: auto;
//     padding: 1rem;
//   }
// `;

// const HeaderContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
// `;

// const Logo = styled(Link)`
//   font-size: 1.25rem;
//   font-weight: bold;
//   color: #000;
//   text-decoration: none;
// `;

// const NavDesktop = styled.nav`
//   display: none;

//   @media (min-width: 768px) {
//     display: flex;
//     align-items: center;
//     gap: 1.5rem;
//   }
// `;

// const NavLink = styled(Link)`
//   color: #333;
//   text-decoration: none;
//   font-weight: 500;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #0056b3;
//   }
// `;

// const MenuButton = styled.button`
//   background: none;
//   border: none;
//   color: #333;
//   cursor: pointer;
//   font-size: 1.5rem;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const NavMobile = styled.nav`
//   background-color: #f8f9fa;
//   padding: 1rem;
//   width: 100%;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const MobileNavLink = styled(NavLink)`
//   display: block;
//   padding: 0.5rem 0;
// `;

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <HeaderWrapper>
//       <HeaderContainer>
//         <HeaderContent>
//           <Logo to="/">Advanced User Portal</Logo>

//           <NavDesktop>
//             <NavLink to="/skill-ranking">Skill Ranking</NavLink>
//             <NavLink to="/job-matching">Job Matching</NavLink>
//             <NavLink to="/exclusive-jobs">Exclusive Jobs</NavLink>
//             <NavLink to="/notifications">
//               <Bell size={20} />
//             </NavLink>
//           </NavDesktop>

//           <MenuButton onClick={toggleMenu}>
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </MenuButton>
//         </HeaderContent>

//         {isMenuOpen && (
//           <NavMobile>
//             <MobileNavLink to="/skill-ranking" onClick={toggleMenu}>Skill Ranking</MobileNavLink>
//             <MobileNavLink to="/job-matching" onClick={toggleMenu}>Job Matching</MobileNavLink>
//             <MobileNavLink to="/exclusive-jobs" onClick={toggleMenu}>Exclusive Jobs</MobileNavLink>
//             <MobileNavLink to="/notifications" onClick={toggleMenu}>Notifications</MobileNavLink>
//           </NavMobile>
//         )}
//       </HeaderContainer>
//     </HeaderWrapper>
//   );
// };

// export default Header;