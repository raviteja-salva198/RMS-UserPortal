import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BarChart, Briefcase, GraduationCap } from 'lucide-react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
`;

const Hero = styled.div`
  background-color: #3498db;
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  color: #3498db;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #666;
`;

const HomePage = () => {
  return (
    <PageContainer>
      <MainContent>
        <Hero>
          <HeroTitle>Welcome to Your Advanced User Portal</HeroTitle>
          <HeroSubtitle>Unlock premium features to supercharge your job search and career growth.</HeroSubtitle>
        </Hero>
        <FeatureGrid>
          <FeatureCard to="/skill-ranking">
            <FeatureIcon>
              <BarChart size={48} />
            </FeatureIcon>
            <FeatureTitle>Skill Ranking</FeatureTitle>
            <FeatureDescription>Discover how your skills stack up in the job market.</FeatureDescription>
          </FeatureCard>
          <FeatureCard to="/job-matching">
            <FeatureIcon>
              <Briefcase size={48} />
            </FeatureIcon>
            <FeatureTitle>Advanced Job Matching</FeatureTitle>
            <FeatureDescription>Find the perfect job opportunities tailored to your profile.</FeatureDescription>
          </FeatureCard>
          <FeatureCard to="/exam-home">
            <FeatureIcon>
              <GraduationCap size={48} />
            </FeatureIcon>
            <FeatureTitle>Certification Exams</FeatureTitle>
            <FeatureDescription>Take AI-proctored online exams or schedule offline certifications.</FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </MainContent>
    </PageContainer>
  );
};

export default HomePage;