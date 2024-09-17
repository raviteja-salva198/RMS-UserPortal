import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from 'lucide-react';
import logoSrc from "../../logo/agh_logo.png";

const FooterWrapper = styled.div`
  background-color: #dbdbdb;
  border-top: 1px solid #e5e7eb;
`;

const FooterContainer = styled.footer`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #333;
  
  @media (max-width: 1240px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
  justify-content: center;
`;

const LogoContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  overflow: hidden;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  max-width: 100%;
  max-height:100%;
  object-fit: contain;
`;

const LogoFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  border-radius: 50%;
`;

const CompanyName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #6c757d;
`;

const CopyrightText = styled.p`
  margin-bottom: 0.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #6c757d;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #2c3e50;
  }
`;

const LogoWithFallback = () => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <LogoContainer>
        <LogoFallback>
          <Image size={24} />
        </LogoFallback>
      </LogoContainer>
    );
  }

  return (
    <LogoContainer>
      <Logo
        src={logoSrc}
        alt="AGH"
        onError={() => setError(true)}
      />
    </LogoContainer>
  );
};

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <LogoSection>
            <LogoWithFallback />
            <CompanyName>Aptitude Guru Hemchandar</CompanyName>
          </LogoSection>
          <Copyright>
            <CopyrightText>
              &copy; {new Date().getFullYear()} Advanced User Portal. All rights reserved.
            </CopyrightText>
            <CopyrightText>
              Designed and developed with care.
            </CopyrightText>
          </Copyright>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </SocialLink>
          </SocialLinks>
        </FooterContent>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;