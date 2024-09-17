import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';

const HeaderWrapper = styled.div`
  background-color: #dbdbdb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 74px;
  
  @media (max-width: 1240px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
  text-decoration: none;
`;

const NavDesktop = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMobile = styled.nav`
  background-color: #f8f9fa;
  padding: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  padding: 0.5rem 0;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 200px;
  margin-right:10px;
`;

const BuyPremiumButton = styled.button`
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left:20px;
`;

const LoginSignupButton = styled.button`
  background-color: #337ab7;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left:20px;
`;

const LogoImage = styled.img`
  height:40px;
  margin-right:auto;
`
;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">
             <LogoImage src="https://res.cloudinary.com/dw5uzflen/image/upload/v1724923402/agh-logo1_cuz9ns_n7krtq.png" />
          </Logo>

          <NavDesktop>
            <NavLink to="/skill-ranking">Skill Ranking</NavLink>
            <NavLink to="/job-matching">Job Matching</NavLink>
            <NavLink to="/exclusive-jobs">Exclusive Jobs</NavLink>
            <NavLink to="/job-reports">Job Reports</NavLink>
            <NavLink to="/application-reports">Application Reports</NavLink>
            <NavLink to="/job-search">Job Search</NavLink>
            <NavLink to="/job-alert">Job Alert</NavLink>
            <NavLink to="/notifications">
              <Bell size={20} />
            </NavLink>
          </NavDesktop>

          <BuyPremiumButton>Premium</BuyPremiumButton>
          <LoginSignupButton>Login</LoginSignupButton>

          <MenuButton onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>
        </HeaderContent>

        {isMenuOpen && (
          <NavMobile>
            <MobileNavLink to="/skill-ranking" onClick={toggleMenu}>Skill Ranking</MobileNavLink>
            <MobileNavLink to="/job-matching" onClick={toggleMenu}>Job Matching</MobileNavLink>
            <MobileNavLink to="/exclusive-jobs" onClick={toggleMenu}>Exclusive Jobs</MobileNavLink>
            <MobileNavLink to="/job-reports" onClick={toggleMenu}>Job Reports</MobileNavLink>
            <MobileNavLink to="/application-reports" onClick={toggleMenu}>Application Reports</MobileNavLink>
            <MobileNavLink to="/notifications" onClick={toggleMenu}>Notifications</MobileNavLink>
            <MobileNavLink to="/job-search" onClick={toggleMenu}>Job Search</MobileNavLink>
            <MobileNavLink to="/job-alert" onClick={toggleMenu}>Job Alert</MobileNavLink>
          </NavMobile>
        )}
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