import Sidebar from "../Sidebar/Sidebar";
import { Container, Form } from "./style";
import PersonalInfomationForm from "../PersonalInformation/PersonalInformation";
import AdditionalInformation from "../AdditionalInformation/AdditionalInformation";
import WorkExperience from "../WorkExperience/WorkExperience";
import JobPreference from "../jobPreference/jobPreference";
import EducationFrom from "../Education/Education";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const JobApplicationLayout = () => {
  const [currentFormStep, setCurrentFormStep] = useState(2);
  //TODO: show modal when user try to refresh page => if form has some filled values because all form data get reset on page refresh.
  const methods = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileCountryCode: "+91",
      phoneNumberMobile: "",
      homeCountryCode: "+91",
      phoneNumberHome: "",
      homeAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      dateOfBirth: "",
      gender: "",
      nationality: "",
      maritalStatus: "",
      linkedInProfile: "",
      personalWebsite: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyCountryCode: "+91",
      emergencyContactPhoneNumber: "",
      sameAsPermanent: false,
    },
  });

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   console.log("complete form data", step_1, step_2, step_3, step_4, step_5);
  //   dispatch(addFormData({ step: "step_5", data: data }));

  //   console.log("This is the additional info", step_5);
  //   const loadingToast = toast.loading("Submitting application...");

  //   try {
  //     const jobPreferances = {
  //       preferredWorkingHours: step_3.preferredWorkingHours.label,
  //       preferredCompanySize: step_3.preferredCompanySize.label,
  //       preferredWorkEnvironment: step_3.preferredWorkEnvironment.label,
  //       preferredRoleLevel: step_3.preferredRoleLevel.label,
  //       preferredBenefits: step_3.desiredBenefits.label,
  //       preferredCompanyCulture: step_3.preferredCompanyCulture.label,
  //       cities: step_3.cities.label,
  //       state: step_3.state.label,
  //       positionAppliedFor: step_3.positionAppliedFor.label,
  //       careerGoals: step_3.careerGoals,
  //       additionalComments: step_3.additionalPreferencesOrComments,
  //       desiredIndustry: step_3.desiredIndustry.label,
  //       currentEmploymentStatus: step_3.employmentStatus,
  //       currency: step_3.currency,
  //       preferredJobType: toString(step_3.preferredJobType),
  //       preferredCountry: step_3.country.label,
  //       minSalary: step_3.minSalary,
  //       maxSalary: step_3.maxSalary,
  //       availableToStart: step_3.availabilityToStart,
  //       willingnessToRelocate: step_3.willingnessToRelocate.label,
  //       willingnessToTravel: step_3.willingnessToTravel.label,
  //     };

  //     const res = await axios.post(
  //       "http://localhost:23000/api/v1" + "/user/studentRegistration",
  //       {
  //         firstName: step_1.personalInfo.firstName,
  //         lastName: step_1.personalInfo.lastName,
  //         middleName: step_1.personalInfo.middleName,
  //         email: step_1.personalInfo.email,
  //         mobileNumber: step_1.personalInfo.phoneNumberMobile,
  //         mobilecountryCode: step_1.personalInfo.mobileCountryCode,
  //         phonecountryCode: step_1.personalInfo.homeCountryCode,
  //         phoneNumber: step_1.personalInfo.phoneNumberHome,
  //         address: step_1.personalInfo.homeAddress,
  //         tempaddress: step_1.personalInfo.temporaryAddress,
  //         gender: step_1.personalInfo.gender,
  //         maritialInfo: step_1.personalInfo.maritalStatus,
  //         dateofBirth: step_1.personalInfo.dateOfBirth,
  //         nationality: step_1.personalInfo.nationality,
  //         personalWebsite: step_1.personalInfo.personalWebsite,
  //         linkedinProfile: step_1.personalInfo.linkedinProfile,
  //         emergencyContact: step_1.personalInfo.emergencyContactName,
  //         emergencyContactCode: step_1.personalInfo.emergencyCountryCode,
  //         emergencyContactPhone:
  //           step_1.personalInfo.emergencyContactPhoneNumber,
  //         schoolInfo: step_2["10th"],
  //         higherSchoolInfo: step_2["12th"],
  //         degree: step_2.bachelorDegrees,
  //         educationLevel: step_2.educationLevel,
  //         haveGapsAfter12th: step_2.has12th,
  //         hasGaps: step_2.hasGaps,
  //         jobPreferances,
  //         isFresher: step_4.isFresher == "yes" ? true : false,
  //         jobInfo: step_4.experiences,
  //         passportDetails: step_5.passportDetails,
  //         trainingWorkShops: step_5.trainingWorkShops,
  //         visaInfo: step_5.visaEntries,
  //         languages: step_5.languages,
  //         skills: step_5.skills,
  //         resume: step_5.resumeCV,
  //         workSamples: step_5.workSamples,
  //         awards: step_5.awardsHonors,
  //         publications: step_5.publications,
  //         hobbies: step_5.hobbies,
  //         volunteerExperience: step_5.volunteerExperience,
  //       },

  //       { rejectUnauthorized: false }
  //     );
  //     toast.success("Application submitted successfully!");
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log(error.message);
  //   } finally {
  //     toast.dismiss(loadingToast);
  //   }
  // };

  const onSubmit = (data) => {
    console.log("submit data", data);
  };

  return (
    <Container>
      <Sidebar currentFormStep={currentFormStep} />
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          {currentFormStep === 1 && (
            <PersonalInfomationForm setCurrentFormStep={setCurrentFormStep} />
          )}
          {currentFormStep === 2 && (
            <EducationFrom setCurrentFormStep={setCurrentFormStep} />
          )}
          {currentFormStep === 3 && (
            <JobPreference setCurrentFormStep={setCurrentFormStep} />
          )}
          {currentFormStep === 4 && (
            <WorkExperience setCurrentFormStep={setCurrentFormStep} />
          )}
          {currentFormStep === 5 && (
            <AdditionalInformation setCurrentFormStep={setCurrentFormStep} />
          )}
        </Form>
      </FormProvider>
    </Container>
  );
};

export default JobApplicationLayout;
