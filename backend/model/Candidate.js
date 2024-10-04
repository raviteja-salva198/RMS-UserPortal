// models/Candidate.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String
});

const educationSchema = new mongoose.Schema({
  board: String,
  cgpa: String,
  city: String,
  country: String,
  school: String,
  state: String,
  yearOfPassing: Number
});

const degreeSchema = new mongoose.Schema({
  cgpa: String,
  city: String,
  completionStatus: String,
  country: String,
  degreeType: String,
  fieldOfStudy: String,
  graduationYear: Number,
  institution: {
    value: String,
    label: String,
    country_shortname: String
  },
  state: String
});

const diplomaSchema = new mongoose.Schema({
  city: String,
  completionYear: Number,
  country: String,
  fieldOfStudy: String,
  institution: {
    value: String,
    label: String,
    country_shortname: String
  },
  state: String,
  title: String
});

const doctorateSchema = new mongoose.Schema({
  city: String,
  completionYear: Number,
  country: String,
  institution: String,
  state: String,
  thesisTitle: String
});

const experienceSchema = new mongoose.Schema({
  city: String,
  company: String,
  country: String,
  endDate: Date,
  jobTitle: String,
  responsibilities: String,
  startDate: Date,
  state: String
});

const passportSchema = new mongoose.Schema({
  hasValidPassport: Boolean,
  hasValidVisa: Boolean,
  passportDocument: String,
  passportNumber: String
});

const preferredJobTypeSchema = new mongoose.Schema({
  fulltime: Boolean,
  parttime: Boolean,
  contract: Boolean,
  internship: Boolean
});

const visaEntrySchema = new mongoose.Schema({
  country: String,
  type: String,
  expiryDate: Date
});

const candidateSchema = new mongoose.Schema({
  '10th': educationSchema,
  '12th': educationSchema,
  additionalPreferencesOrComments: String,
  availabilityToStart: Date,
  awardsHonor: [String],
  bachelorList: [degreeSchema],
  candidateId: String,
  careerGoals: String,
  cities: [String],
  country: String,
  currency: String,
  dateOfBirth: Date,
  desiredBenefits: String,
  desiredIndustry: String,
  desiredSalary: String,
  diplomaList: [diplomaSchema],
  doctorateList: [doctorateSchema],
  educationLevel: String,
  email: String,
  emergencyContactName: String,
  emergencyContactPhoneNumber: String,
  emergencyContactRelationship: String,
  emergencyCountryCode: String,
  employmentStatus: String,
  experiences: [experienceSchema],
  firstName: String,
  gapDetails: String,
  gender: String,
  hasDiploma: String,
  hasGaps: Boolean,
  hobbie: [String],
  homeAddress: addressSchema,
  homeCountryCode: String,
  isFresher: String,
  lastName: String,
  linkedInProfile: String,
  maritalStatus: String,
  masterList: [degreeSchema],
  maxSalary: String,
  middleName: String,
  minSalary: String,
  mobileCountryCode: String,
  nationality: String,
  otherReleventQualification: String,
  passportDetails: passportSchema,
  personalWebsite: String,
  phoneNumberHome: String,
  phoneNumberMobile: String,
  positionAppliedFor: [String],
  preferredCompanyCulture: String,
  preferredCompanySize: String,
  preferredJobType: preferredJobTypeSchema,
  preferredRoleLevel: String,
  preferredWorkEnvironment: String,
  preferredWorkingHours: String,
  professionalAffiliation: [String],
  publication: [String],
  resume: String,
  sameAsPermanent: Boolean,
  skills: [String],
  state: String,
  temporaryAddress: addressSchema,
  trainingWorkShop: [{
    title: String,
    organizer: String,
    date: Date
  }],
  visaEntry: [visaEntrySchema],
  volunteer: [String],
  willingnessToRelocate: String,
  willingnessToTravel: String,
  workSample: [String]
});

module.exports = mongoose.model('Candidate', candidateSchema);