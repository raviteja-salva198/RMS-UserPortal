import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
// import Signup from './components/Auth/signup';
// import Login from './components/Auth/login';
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
import Cookies from "js-cookie";

const App = () => {
  const { user, isLoggedIn, status, error } = useSelector(
    (state) => state.auth
  );

  const token = Cookies.get("token");
  console.log(token)

  const Layout = ({ children }) => (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );

  return (
    // <Router>
    <>
      <Layout>
      <Routes>
        <Route path="/signup" element={<UserSignupComponent />} />
        <Route path="/login" element={<UserLoginComponent />} />

          <Route path="/" element={<HomePage />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path="/exam-home" element={<ExamHomePage />} />
          <Route path="/skill-ranking" element={<RankingSystem />} />
          <Route path="/job-matching" element={<JobMatcher />} />
          <Route path='exclusive-jobs' element={<ExamHomePage />} />
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
          <Route
            path="/job-reports"
            element={<JobApplicationsComponent />}
          />
          <Route path="/application-reports" element={<ReportDashboard />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/job-alert" element={<JobalertsComponent />} />
          <Route path="/edit-profile" element={<ImageUpload />} />
          <Route path="/notification" element={<PushNotification />} />


        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
      </Layout>
      </>
    // </Router>
  );
};

export default App;

//<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>