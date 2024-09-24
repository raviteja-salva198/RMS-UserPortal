import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage/HomePage';
import RankingSystem from './components/SkillRanking/RankingSystem/RankingSystem';
import JobMatcher from './components/JobMatching/JobMatcher';
import RegistrationForm from "./components/CertficationExam/RegistrationForm/RegistrationForm";
import ExamDetails from "./components/CertficationExam/ExamDetails/ExamDetails";
import Payment from "./components/CertficationExam/PaymentPage/PaymentPage";
import CertificationDetails from "./components/CertficationExam/CertificationDetails/CertificationDetails";
import ExamContent from "./components/CertficationExam/ExamContent/ExamContent";
import ExamScheduling from "./components/CertficationExam/ExamScheduling/ExamScheduling";
import CandidatePreparation from "./components/CertficationExam/CandidatePreparation/CandidatePreparation";
import ExamAdministration from "./components/CertficationExam/ExamAdministration/ExamAdministration";
import ResultsFeedback from "./components/CertficationExam/ResultsFeedback/ResultsFeedback";
import ExamsAvailable from "./components/CertficationExam/ExamsAvailable/ExamsAvailable";
import ExamHomePage from "./components/CertficationExam/ExamHomePage/ExamHomePage";
import PremiumPlans from './pages/PremiumPlans/PremiumPlans';
import Sidebar from './components/Layout/Sidebar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import "./App.css";
import { useSelector } from "react-redux";
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Notifications from './components/Notifications/Notifications';
import JobApplicationsComponent from './components/JobApplications/job-applications-component';
import ImageUpload from "./pages/ProfileEdit/ProfileEdit";
import JobApplicationLayout from './jobApplicationForm/jobApplicationFormLayout';
import JobSearch from "./pages/job-search/job-search-component";
import ReportDashboard from './pages/ReportDashboard';
import PushNotification from "./components/pushup-notifications/pushup-notifications-component";
import JobalertsComponent from './components/JobAlerts';
import UserLoginComponent from './pages/login/userLogin';
import UserSignupComponent from './pages/signup/userSignup';
import { PlanProvider } from './context/PlanContext';

const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '250px' : '60px')};
  transition: margin-left 0.3s ease;
  padding: 70px 10px 10px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 90px;
  }
`;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Layout = ({ children }) => (
    <AppContainer>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent isSidebarOpen={isSidebarOpen}>
        {children}
        <Footer />
      </MainContent>
    </AppContainer>
  );

  return (
  <PlanProvider>
         <Routes>
      <Route path="/signup" element={<UserSignupComponent />} />
      <Route path="/login" element={<UserLoginComponent />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path="/exam-home" element={<ExamHomePage />} />
                <Route path="/skill-ranking" element={<RankingSystem />} />
                <Route path="/job-matching" element={<JobMatcher />} />
                <Route path='/exclusive-jobs' element={<ExamHomePage />} />
                <Route path="/exams-available" element={<ExamsAvailable />} />
                <Route path="/register/:examId" element={<RegistrationForm />} />
                <Route path="/exam-details/:examId" element={<ExamDetails />} />
                <Route path="/certificate-details/:examId" element={<CertificationDetails />} />
                <Route path="/exam-content/:examId" element={<ExamContent />} />
                <Route path="/exam-scheduling/:examId" element={<ExamScheduling />} />
                <Route path="/candidate-preparation/:examId" element={<CandidatePreparation />} />
                <Route path="/exam-administration/:examId" element={<ExamAdministration />} />
                <Route path="/results-feedback/:examId" element={<ResultsFeedback />} />
                <Route path="/payment/:examId" element={<Payment />} />
                <Route path="/job-reports" element={<JobApplicationsComponent />} />
                <Route path="/application-reports" element={<ReportDashboard />} />
                <Route path="/job-search" element={<JobSearch />} />
                <Route path="/job-alert" element={<JobalertsComponent />} />
                <Route path="/edit-profile" element={<ImageUpload />} />
                <Route path="/notification" element={<PushNotification />} />
                <Route path="/registration-form" element={<JobApplicationLayout />} />
                <Route path="/premium-plans" element={<PremiumPlans />} />
              </Routes>
            </Layout>
          }
        />
      </Route>
    </Routes>
  </PlanProvider>
  );
};

export default App;





// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import styled from 'styled-components';
// import HomePage from './pages/HomePage/HomePage';
// import RankingSystem from './components/SkillRanking/RankingSystem/RankingSystem';
// import JobMatcher from './components/JobMatching/JobMatcher';
// import RegistrationForm from "./components/CertficationExam/RegistrationForm/RegistrationForm";
// import ExamDetails from "./components/CertficationExam/ExamDetails/ExamDetails";
// import Payment from "./components/CertficationExam/PaymentPage/PaymentPage";
// import CertificationDetails from "./components/CertficationExam/CertificationDetails/CertificationDetails";
// import ExamContent from "./components/CertficationExam/ExamContent/ExamContent";
// import ExamScheduling from "./components/CertficationExam/ExamScheduling/ExamScheduling";
// import CandidatePreparation from "./components/CertficationExam/CandidatePreparation/CandidatePreparation";
// import ExamAdministration from "./components/CertficationExam/ExamAdministration/ExamAdministration";
// import ResultsFeedback from "./components/CertficationExam/ResultsFeedback/ResultsFeedback";
// import ExamsAvailable from "./components/CertficationExam/ExamsAvailable/ExamsAvailable";
// import ExamHomePage from "./components/CertficationExam/ExamHomePage/ExamHomePage";
// import PremiumPlans from './pages/PremiumPlans/PremiumPlans';
// // import Signup from './components/Auth/signup';
// // import Login from './components/Auth/login';
// import Sidebar from './components/Layout/Sidebar';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import "./App.css";
// import { useSelector } from "react-redux";
// import Header from './components/Layout/Header';
// import Footer from './components/Layout/Footer';
// import Notifications from './components/Notifications/Notifications';
// import JobApplicationsComponent from './components/JobApplications/job-applications-component';
// import ImageUpload from "./pages/ProfileEdit/ProfileEdit";
// import JobApplicationLayout from './jobApplicationForm/jobApplicationFormLayout';
// import JobSearch from "./pages/job-search/job-search-component";
// import ReportDashboard from './pages/ReportDashboard';
// import PushNotification from "./components/pushup-notifications/pushup-notifications-component";
// import JobalertsComponent from './components/JobAlerts';
// import UserLoginComponent from './pages/login/userLogin';
// import UserSignupComponent from './pages/signup/userSignup';

// const AppContainer = styled.div`
//   display: flex;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '250px' : '60px')};
//   transition: margin-left 0.3s ease;
//   padding: 70px 10px 10px; // Increase top padding to account for the header

//   @media (max-width: 768px) {
//     margin-left: 0;
//     padding-top: 90px; // Increase top padding for mobile view
//   }
// `;

// const App = () => {
//   const { user, isLoggedIn, status, error } = useSelector(
//     (state) => state.auth
//   );

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const Layout = ({ children }) => (
//     <AppContainer>
//       <Header toggleSidebar={toggleSidebar} />
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <MainContent isSidebarOpen={isSidebarOpen}>
//         {children}
//         <Footer />
//       </MainContent>
//     </AppContainer>
//   );

//   return (
//     // <Router>
//     <>
//       <Layout>
//       <Routes>
//         <Route path="/signup" element={<UserSignupComponent />} />
//         <Route path="/login" element={<UserLoginComponent />} />
//         <Route path="/" element={<ProtectedRoute />}>
//           <Route path="/" element={<HomePage />} />
//           <Route path='/notifications' element={<Notifications />} />
//           <Route path="/exam-home" element={<ExamHomePage />} />
//           <Route path="/skill-ranking" element={<RankingSystem />} />
//           <Route path="/job-matching" element={<JobMatcher />} />
//           <Route path='/exclusive-jobs' element={<ExamHomePage />} />
//           <Route path="/exams-available" element={<ExamsAvailable />} />
//           <Route path="/register/:examId" element={<RegistrationForm />} />
//           <Route path="/exam-details/:examId" element={<ExamDetails />} />
//           <Route path="/certificate-details/:examId" element={<CertificationDetails />} />
//           <Route path="/exam-content/:examId" element={<ExamContent />} />
//           <Route path="/exam-scheduling/:examId" element={<ExamScheduling />} />
//           <Route path="/candidate-preparation/:examId" element={<CandidatePreparation />} />
//           <Route path="/exam-administration/:examId" element={<ExamAdministration />} />
//           <Route path="/results-feedback/:examId" element={<ResultsFeedback />} />
//           <Route path="/payment/:examId" element={<Payment />} />
//           <Route
//             path="/job-reports"
//             element={<JobApplicationsComponent />}
//           />
//           <Route path="/application-reports" element={<ReportDashboard />} />
//           <Route path="/job-search" element={<JobSearch />} />
//           <Route path="/job-alert" element={<JobalertsComponent />} />
//           <Route path="/edit-profile" element={<ImageUpload />} />
//           <Route path="/notification" element={<PushNotification />} />
//           <Route path="/registration-form" element={<JobApplicationLayout />} />
//           <Route path="/premium-plans" element={<PremiumPlans />} />
        
//         </Route>
//         {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
//       </Routes>
//       </Layout>
//       </>
//     // </Router>
//   );
// };

// export default App;

// //<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
