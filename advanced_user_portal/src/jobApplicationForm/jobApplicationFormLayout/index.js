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
import { faInstitution } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from "axios";

const JobApplicationLayout = () => {
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const token = Cookies.get('token');
  const decoded = token ? jwtDecode(token) : null;
  const candidateId = decoded ? decoded.id : null;
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

  const onSubmit = async (data) => {
  
    const formData = {
      // Personal Information
      candidateId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender?.value,
      maritalStatus: data.maritalStatus?.value,
      nationality: data.nationality?.value,
      email: data.email,
      phoneNumberMobile: data.phoneNumberMobile,
      phoneNumberHome: data.phoneNumberHome,
      mobileCountryCode: data.mobileCountryCode?.value,
      homeCountryCode: data.homeCountryCode?.value,
  
      // Address
      homeAddress: {
        street: data.homeAddress.street,
        city: data.homeAddress.city,
        state: data.homeAddress.state,
        zipCode: data.homeAddress.zipCode
      },
      temporaryAddress: data.temporaryAddress ? {
        street: data.temporaryAddress.street,
        city: data.temporaryAddress.city,
        state: data.temporaryAddress.state,
        zipCode: data.temporaryAddress.zipCode
      } : null,
      sameAsPermanent: data.sameAsPermanent,
  
      // Education
      educationLevel: data.educationLevel?.value,
      "10th": {
        board: data["10th"].board?.value,
        cgpa: data["10th"].cgpa,
        school: data["10th"].school,
        city: data["10th"].city?.value,
        state: data["10th"].state?.value,
        country: data["10th"].country?.value,
        yearOfPassing: data["10th"].yearOfPassing?.value
      },
      "12th": {
        board: data["12th"].board?.value,
        cgpa: data["12th"].cgpa,
        school: data["12th"].school,
        city: data["12th"].city?.value,
        state: data["12th"].state?.value,
        country: data["12th"].country?.value,
        yearOfPassing: data["12th"].yearOfPassing?.value
      },
      hasDiploma: data.hasDiploma,
      diplomaList: data.diplomaList?.map(diploma => ({
        title: diploma.title,
        fieldOfStudy: diploma.fieldOfStudy?.value,
        completionYear: diploma.completionYear?.value,
        country: diploma.country?.value,
        state: diploma.state?.value,
        city: diploma.city?.value,
        institution: diploma.institution
      })),
      bachelorList: data.bachelorList?.map(bachelor => ({
        cgpa: bachelor.cgpa,
        degreeType: bachelor.degreeType?.value,
        fieldOfStudy: bachelor.fieldOfStudy?.value,
        completionStatus: bachelor.completionStatus?.value,
        graduationYear: bachelor.graduationYear?.value,
        country: bachelor.country?.value,
        state: bachelor.state?.value,
        city: bachelor.city?.value,
        institution: bachelor.institution
      })),
      masterList: data.masterList?.map(master => ({
        cgpa: master.cgpa,
        degreeType: master.degreeType?.value,
        fieldOfStudy: master.fieldOfStudy?.value,
        completionStatus: master.completionStatus?.value,
        graduationYear: master.graduationYear?.value,
        country: master.country?.value,
        state: master.state?.value,
        city: master.city?.value,
        institution: master.institution
      })),
      doctorateList: data.doctorateList?.map(doctorate => ({
        thesisTitle: doctorate.thesisTitle,
        country: doctorate.country,
        state: doctorate.state,
        city: doctorate.city,
        institution: doctorate.institution,
        completionYear: doctorate.completionYear?.value
      })),
  
      // Professional Information
      isFresher: data.isFresher,
      experiences: data.experiences?.map(exp => ({
        company: exp.company,
        jobTitle: exp.jobTitle,
        startDate: exp.startDate,
        endDate: exp.endDate,
        responsibilities: exp.responsibilities,
        country: exp.country?.value,
        state: exp.state?.value,
        city: exp.city?.value
      })),
      skills: data.skills?.map(skill => skill.value),
      employmentStatus: data.employmentStatus,
      hasGaps: data.hasGaps,
      gapDetails: data.gapDetails,
  
      // Preferences
      positionAppliedFor: data.positionAppliedFor?.map(position => position.value),
      preferredJobType: {
        fulltime: data.preferredJobType.fulltime,
        parttime: data.preferredJobType.parttime,
        contract: data.preferredJobType.contract,
        internship: data.preferredJobType.internship
      },
      preferredRoleLevel: data.preferredRoleLevel?.value,
      preferredWorkEnvironment: data.preferredWorkEnvironment?.value,
      preferredCompanySize: data.preferredCompanySize?.value,
      preferredCompanyCulture: data.preferredCompanyCulture?.value,
      preferredWorkingHours: data.preferredWorkingHours?.value,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      currency: data.currency?.value,
      desiredSalary: `${data.currency?.value} ${data.minSalary}-${data.maxSalary}`,
      desiredBenefits: data.desiredBenefits?.value,
      desiredIndustry: data.desiredIndustry?.value,
      willingnessToRelocate: data.willingnessToRelocate?.value,
      willingnessToTravel: data.willingnessToTravel?.value,
      cities: data.cities?.map(city => city.value),
      country: data.country?.value,
      state: data.state?.value,
      availabilityToStart: data.availabilityToStart,
  
      // Additional Information
      linkedInProfile: data.linkedInProfile,
      personalWebsite: data.personalWebsite,
      resume: data.resume,
      careerGoals: data.careerGoals,
      additionalPreferencesOrComments: data.additionalPreferencesOrComments,
      otherReleventQualification: data.otherReleventQualification,
      awardsHonor: data.awardsHonor,
      publication: data.publication,
      professionalAffiliation: data.professionalAffiliation,
      volunteer: data.volunteer,
      hobbie: data.hobbie,
      workSample: data.workSample,
      trainingWorkShop: data.trainingWorkShop?.map(training => ({
        title: training.title,
        organizer: training.organizer,
        date: training.date
      })),
  
      // Emergency Contact
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhoneNumber: data.emergencyContactPhoneNumber,
      emergencyCountryCode: data.emergencyCountryCode?.value,
      emergencyContactRelationship: data.emergencyContactRelationship?.value,
  
      // Passport and Visa
      passportDetails: data.passportDetails ? {
        hasValidPassport: data.passportDetails.hasValidPassport,
        passportNumber: data.passportDetails.passportNumber,
        passportDocument: data.passportDetails.passportDocument,
        hasValidVisa: data.passportDetails.hasValidVisa
      } : null,
      visaEntry: data.visaEntry?.map(visa => ({
        country: visa.country?.value,
        type: visa.type,
        expiryDate: visa.expiryDate
      }))
    };

    console.log(formData)

    try {

    const response = await axios.post(`http://localhost:23000/api/v1/candidates/register`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Registration successful:', response.data);
    // Handle successful registration (e.g., show success message, redirect)
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Registration failed:', error.response.data);
      // Handle registration error (e.g., show error message)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      // Handle network error (e.g., show "Network Error" message)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      // Handle unexpected error
    }
  }

  
    console.log("Transformed form data:", formData);
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










/* 

const formData = {
      firstName : data.firstName,
      middleName : data.middleName,
      lastName : data.lastName,
      email : data.email,
      mobileCountryCode: data.mobileCountryCode,
      phoneNumberMobile: data.phoneNumberMobile,
      homeCountryCode: data.homeCountryCode,
      phoneNumberHome: data.phoneNumberHome,
      homeAddress : {
         street: data.homeAddress.street,
         city: data.homeAddress.city,
         state: data.homeAddress.state,
         zipCode: data.homeAddress.zipCode
      },
      temporaryAddress : {
        street: data.temporaryAddress.street,
        city: data.temporaryAddress.city,
        state: data.temporaryAddress.state,
        zipCode: data.temporaryAddress.zipCode
     },
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      nationality: data.nationality,
      maritalStatus: data.maritalStatus,
      linkedInProfile: data.linkedInProfile,
      personalWebsite: data.personalWebsite,
      emergencyContactName: data.emergencyContactName,
      emergencyContactRelationship: data.emergencyContactRelationship,
      emergencyCountryCode: data.emergencyCountryCode,
      emergencyContactPhoneNumber: data.emergencyContactPhoneNumber,
      sameAsPermanent: data.sameAsPermanent,
      
      tenth : {
         board : data["10th"].board.value,
         cgpa:  data["10th"].cgpa,
         city: data["10th"].city.value,
         country: data["10th"].country.value,
         state: data["10th"].state.value,
         school: data["10th"].school,
         yearOfPassing: data["10th"].yearOfPassing.value, 
      },
      
      twelth : {
        board : data["12th"].board.value,
        cgpa:  data["12th"].cgpa,
        city: data["12th"].city.value,
        country: data["12th"].country.value,
        state: data["12th"].state.value,
        school: data["12th"].school,
        yearOfPassing: data["12th"].yearOfPassing.value, 
      },

      bachelorList : data.bachelorList.map((degree) => {
          return {
             cgpa : degree.cgpa,
             city : degree.city.value,
             completionStatus : degree.completionStatus.value,
             country: degree.country.value,
             degreeType: degree.degreeType.label,
             fieldOfStudy : degree.fieldOfStudy.label,
             graduationYear : degree.graduationYear.value,
             institution : degree.institution.value,
             state: degree.state.value,
      }
      }),
        
       diplomaList : data.diplomaList.map((degree) => {
           return {
            cgpa : degree.cgpa,
            city : degree.city.value,
            country: degree.country.value,
            fieldOfStudy : degree.fieldOfStudy.label,
            completionYear : degree.graduationYear.value,
            institution : degree.institution.value,
            state: degree.state.value,
            title: degree.title,
           }
       }), 

       masterList : data.masterList.map((master) => {
          return {
            cgpa : master.cgpa,
            completionStatus: master.completionStatus,
            degreeType: master.degreeType,
            fieldOfStudy: master.fieldOfStudy,
            graduationYear: master.graduationYear,
          }
       }),

      educationLevel : data.educationLevel,
      gapDetails: data.gapDetails,
      additionalPreferencesOrComments : data.additionalPreferencesOrComments,
      availabilityToStart : data.availabilityToStart,
      careerGoals: data.careerGoals,
      awardsHonor : data.awardsHonor.map(award => award),

      preferredCities: data.cities.map(city => city.value),
      preferredCountry: data.country.value,
      preferredSalary: `${data.currency.value} ${data.minSalary}-${data.maxSalary}`,
      desiredBenefits: data.desiredBenefits.value,
      desiredIndustry: data.desiredIndustry.value,
      hasDiploma: data.hasDiploma,
      hasGaps: data.hasGaps,
      hobbie: data.hobbie.map(hob => hob),
      isFresher: data.isFresher,
      language: data.language.map(lan => {
         return {
           name : lan.name,
           speak: lan.speak,
           write: lan.write,
           read: lan.read,

         }
      }),
      otherReleventQualification: data.otherReleventQualification,
      passportDetails : {
        hasValidPassport: data.passportDetails.hasValidPassport,
        hasValidVisa: data.passportDetails.hasValidVisa,
        passportDocument: data.passportDetails.passportDocument,
        passportNumber: data.passportDetails.passportNumber,
      },
      
      preferredRoles: data.positionAppliedFor.map(role => role.value),
      preferredCompanyCulture: data.preferredCompanyCulture.value,
      preferredCompanySize: data.preferredCompanySize.label,
      preferredJobType: {
         fulltime: data.preferredJobType.fulltime,
         parttime: data.preferredJobType.parttime,
         contract: data.preferredJobType.contract,
         internship: data.preferredJobType.internship,
      },
      preferredRoleLevel: data.preferredRoleLevel.value,
      preferredWorkEnvironment: data.preferredWorkEnvironment.value,
      preferredWorkingHours: data.preferredWorkingHours.value,
      professionalAffiliation: data.professionalAffiliation.map(item => item),
      publication: data.publication.map(item => item),
      resume: data.resume,
      skills: data.skills.map(item => item.label),
      
      trainingWorkshop: data.trainingWorkshop.map(item => {
        return {
            title : item.title,
            type: item.type,
            date: item.date,
            description: item.description,
         }
      }),

      visaEntry: data.visaEntry.map(item => {
        return {
          country : item.country,
          visaDocument: item.visaDocument,
          visaNumber: item.visaNumber,
          visaType: item.visaType,
        }

      }),

      volunteer : data.volunteer.map(item => item),
      willingnessToRelocate: data.willingnessToRelocate.value,
      willingnessToTravel: data.willingnessToTravel.value,
      workSample: data.workSample.map(item => item);



*/



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

