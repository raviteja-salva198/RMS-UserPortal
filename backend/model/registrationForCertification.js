const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    // Candidate Information (Should come from registration page)
    fullName: String,
    email: String,
    phoneNumber: String,
    dateOfBirth: String,
    gender: String,
    address: String,
    educationLevel: String,
    specialization: String,
    currentInstitution: String,
    enrollmentNumber: String,
  
    // Exam Details
    examTitle: String,
    examDescription: String,
    examCategory: String, // e.g., Technical, Aptitude, Language, etc.
    examCode: String,
    examDuration: String, // in minutes
    totalMarks: String,
    passingCriteria: String,
    modeOfExam: String, // e.g., Online, Offline
    attemptsAllowed: String,
    examFee: String,
  
    // Certification Details
    certificationTitle: String,
    certificationLevel: String, // e.g., Beginner, Intermediate, Advanced
    validityPeriod: String, // in years
    certificationId: String,
    certificationAuthority: String,
    issueDate: String,
    expiryDate: String, // Optional
    renewalCriteria: String,
  
    // Exam Content
    questionTypes: [String], // Array of question types (e.g., Multiple Choice, True/False, etc.)
    numberOfQuestions: String,
    sectionBreakdown: String, // JSON string or object for section-wise breakdown, if applicable
    syllabusTopics: String, // Syllabus or topics covered
    referenceMaterials: String, // Reference materials (e.g., Books, Articles, Videos, etc.)
  
    // Exam Scheduling
    examDate: String,
    examTime: String, // Store as a string for easier manipulation (HH:MM format)
    timeZone: String, // e.g., IST, EST, etc.
    rescheduleOption: String, // Yes or No
    reschedulePolicy: String, // Details about the reschedule policy, if applicable
    slotBooking: String, // Details about slot booking, if applicable
  
    // Candidate Preparation
    studyGuides: String, // URLs or descriptions of study guides
    practiceTests: String, // URLs or descriptions of practice tests
    previousYearPapers: String, // URLs or descriptions of previous year papers
    tutorialVideos: String, // URLs or descriptions of tutorial videos
    faqsAndTips: String, // FAQs and tips
  
    // Exam Administration
    idVerificationRequired: String, // Yes or No
    examRules: String, // Exam rules and guidelines
    allowedMaterials: String, // Allowed materials (e.g., Calculator, Notes, etc.)
    prohibitedMaterials: String, // Prohibited materials
    examEnvironmentSetup: String, // Exam environment setup instructions
  
    // Results & Feedback
    resultAnnouncementDate: String, // Approximately within 2-5 working days
    resultStatus: String, // Passed or Failed
    scoreObtained: String,
    rankOrPercentile: String, // Optional: Rank or percentile, if applicable
    detailedScorecard: String, // Section-wise breakdown of scores
    feedbackSuggestions: String, // Optional: Feedback or suggestions from candidate
    reEvaluationRequestOption: String, // Yes or No
    certificationIssuance: String, // URL or option to download/print certification
  });
  
  const Registration = mongoose.model("Registration", registrationSchema);