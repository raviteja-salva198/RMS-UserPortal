import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import {
  Layout,
  MainContent,
  Form,
  FormSection,
  MainHeading,
  FormGroup,
  Label,
  Input,
  PhoneInput,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  ErrorMessage,
  SubmitButton,
} from "../style";
import countryOptions from '../formStaticData/country.json';
import {
  genderOptions,
  phoneCountryCode,
  relationshipOptions,
  maritalStatusOptions,
} from "../formStaticData/optionData";

const calculateAge = (birthDate) => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};

const isValidLinkedInURL = (url) => {
  const linkedInRegex =
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|profile\/view)\//i;
  return linkedInRegex.test(url);
};
const arrayFieldsOfInput = [
  "firstName",
  "middleName",
  "lastName",
  "email",
  "mobileCountryCode",
  "phoneNumberMobile",
  "homeCountryCode",
  "phoneNumberHome",
  "dateOfBirth",
  "gender",
  "nationality",
  "maritalStatus",
  "linkedInProfile",
  "personalWebsite",
  "emergencyContactName",
  "emergencyContactRelationship",
  "emergencyCountryCode",
  "emergencyContactPhoneNumber",
  "sameAsPermanent",
  "homeAddress.street",
  "homeAddress.city",
  "homeAddress.state",
  "homeAddress.zipCode",
];

const PersonalInformationForm = ({ setCurrentFormStep }) => {
  // const handleSameAsPermanent = () => {
  //   const current = watch("sameAsPermanent");
  //   setValue("sameAsPermanent", !current);

  //   if (!current) {
  //     // Copy home address to temporary address
  //     const homeAddress = watch("homeAddress");
  //     setValue("temporaryAddress", homeAddress);
  //   } else {
  //     // Clear temporary address fields
  //     setValue("temporaryAddress", {
  //       street: "",
  //       city: "",
  //       state: "",
  //       zipCode: "",
  //     });
  //   }
  // };

  const {
    register,
    trigger,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useFormContext();
  const sameAsPermanent = watch("sameAsPermanent");

  const getValidationFields = () => {
    if (sameAsPermanent) {
      return arrayFieldsOfInput;
    } else
      return arrayFieldsOfInput.concat([
        "temporaryAddress.city",
        "temporaryAddress.state",
        "temporaryAddress.street",
        "temporaryAddress.zipCode",
      ]);
  };
  return (
    <div>
      <FormSection className="form-section">
        <MainHeading className="main-heading-for-page">
          Personal Information
        </MainHeading>

        <FormGroup className="form-group">
          <Label>First Name*</Label>
          <Input
            type="text"
            placeholder="Enter your first name"
            {...register("firstName", {
              required: "First name is required",
              maxLength: {
                value: 50,
                message: "First name cannot exceed 50 characters",
              },
            })}
          />
          {errors.firstName && (
            <ErrorMessage className="error">
              {errors.firstName.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Middle Name</Label>
          <Input
            type="text"
            placeholder="Enter your middle name (if any)"
            {...register("middleName", {
              maxLength: {
                value: 50,
                message: "Middle name cannot exceed 50 characters",
              },
            })}
          />
          {errors.middleName && (
            <ErrorMessage className="error">
              {errors.middleName.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Last Name*</Label>
          <Input
            type="text"
            maxLength="100"
            placeholder="Enter your last name"
            {...register("lastName", {
              required: "Last name is required",
              maxLength: {
                value: 50,
                message: "Last name cannot exceed 50 characters",
              },
            })}
          />
          {errors.lastName && (
            <ErrorMessage className="error">
              {errors.lastName.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Email*</Label>
          <Input
            type="email"
            placeholder="Enter your email address"
            
          />
          {errors.email && (
            <ErrorMessage className="error">
              {errors.email.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Mobile Phone*</Label>
          <PhoneInput className="phone-Input">
            <Controller
              name="mobileCountryCode"
              control={control}
              rules={{ required: "Please select a Country Code" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    {...field}
                    options={phoneCountryCode}
                    placeholder="Select Country Code"
                    isClearable
                  />
                  {error && (
                    <span style={{ color: "red" }}>{error.message}</span>
                  )}
                </div>
              )}
            />
            <Input
              type="tel"
              placeholder="Enter your mobile phone number"
              {...register("phoneNumberMobile", {
                required: "Mobile phone number is required",
                pattern: {
                  value: /^[1-9]\d{6,14}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
          </PhoneInput>
          {errors.phoneNumberMobile && (
            <ErrorMessage className="error">
              {errors.phoneNumberMobile.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Home Phone</Label>
          <PhoneInput className="phone-Input">
            <Controller
              name="homeCountryCode"
              control={control}
              rules={{ required: "Please select a Country Code" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    {...field}
                    options={phoneCountryCode}
                    placeholder="Select Country Code"
                    isClearable
                  />
                  {error && (
                    <span style={{ color: "red" }}>{error.message}</span>
                  )}
                </div>
              )}
            />
            <Input
              type="tel"
              placeholder="Enter your home phone number"
              {...register("phoneNumberHome", {
                required: "Home phone number is required",
                pattern: {
                  value: /^[1-9]\d{6,14}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
          </PhoneInput>
          {errors.phoneNumberHome && (
            <ErrorMessage className="error">
              {errors.phoneNumberHome.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Home Address</Label>
          <Input
            type="text"
            placeholder="Enter street address"
            {...register("homeAddress.street", {
              required: "This is reqired field",
            })}
          />
          {errors.homeAddress?.street && (
            <ErrorMessage className="error">
              {errors.homeAddress.street.message}
            </ErrorMessage>
          )}
          <Input
            type="text"
            placeholder="Enter city"
            {...register("homeAddress.city", {
              required: "This is reqired field",
            })}
          />
          {errors.homeAddress?.city && (
            <ErrorMessage className="error">
              {errors.homeAddress.city.message}
            </ErrorMessage>
          )}
          <Input
            type="text"
            placeholder="Enter state"
            {...register("homeAddress.state", {
              required: "This is reqired field",
            })}
          />
          {errors.homeAddress?.state && (
            <ErrorMessage className="error">
              {errors.homeAddress.state.message}
            </ErrorMessage>
          )}
          <Input
            type="text"
            placeholder="Enter zip code"
            {...register("homeAddress.zipCode", {
              required: "This is a required field",
              pattern: {
                value: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i,
                message: "Please enter a valid zip code",
              },
              maxLength: {
                value: 10,
                message: "Zip code cannot be longer than 10 characters",
              },
            })}
          />
          {errors.homeAddress?.zipCode && (
            <ErrorMessage className="error">
              {errors.homeAddress.zipCode.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <CheckboxLabel>Temporary Address</CheckboxLabel>
          <CheckboxContainer className="checkbox-container">
            <CheckboxInput
              type="checkbox"
              id="sameAsPermanentCheckbox"
              className="checkbox-Input"
              {...register("sameAsPermanent")}
            />
            <Label htmlFor="sameAsPermanentCheckbox" className="checkbox-Label">
              Same as Permanent Address
            </Label>
          </CheckboxContainer>
          {!sameAsPermanent && (
            <>
              <Input
                type="text"
                placeholder="Enter street address"
                {...register("temporaryAddress.street", {
                  required: "This is reqired field",
                })}
              />
              {errors.temporaryAddress?.street && (
                <ErrorMessage className="error">
                  {errors.temporaryAddress.street.message}
                </ErrorMessage>
              )}
              <Input
                type="text"
                placeholder="Enter city"
                {...register("temporaryAddress.city", {
                  required: "This is reqired field",
                })}
              />
              {errors.temporaryAddress?.city && (
                <ErrorMessage className="error">
                  {errors.temporaryAddress.city.message}
                </ErrorMessage>
              )}
              <Input
                type="text"
                placeholder="Enter state"
                {...register("temporaryAddress.state", {
                  required: "This is reqired field",
                })}
              />
              {errors.temporaryAddress?.state && (
                <ErrorMessage className="error">
                  {errors.temporaryAddress.state.message}
                </ErrorMessage>
              )}
              <Input
                type="text"
                placeholder="Enter zip code"
                {...register("temporaryAddress.zipCode", {
                  required: "This is a required field",
                  pattern: {
                    value: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i,
                    message: "Please enter a valid zip code",
                  },
                  maxLength: {
                    value: 10,
                    message: "Zip code cannot be longer than 10 characters",
                  },
                })}
              />
              {errors.temporaryAddress?.zipCode && (
                <ErrorMessage className="error">
                  {errors.temporaryAddress.zipCode.message}
                </ErrorMessage>
              )}
            </>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Date of Birth*</Label>
          <Input
            type="date"
            placeholder="Select your date of birth"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
              validate: {
                notFutureDate: (value) =>
                  new Date(value) <= new Date() ||
                  "Date of birth cannot be in the future",
                validAge: (value) => {
                  const age = calculateAge(new Date(value));
                  return age >= 16 || "You must be at least 16 years old";
                  
                },
              },
            })}
          />
          {errors.dateOfBirth && (
            <ErrorMessage className="error">
              {errors.dateOfBirth.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Gender</Label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Please select a gender" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  {...field}
                  options={genderOptions}
                  placeholder="Select gender"
                  isClearable
                />
                {error && <span style={{ color: "red" }}>{error.message}</span>}
              </div>
            )}
          />
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Nationality*</Label>
          <Controller
            name="nationality"
            control={control}
            rules={{ required: "Please select nationality" }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Select
                  {...field}
                  options={countryOptions.map((country) => ({
                    label: country.country_name,
                    value: country.country_name,
                  }))}
                  placeholder="Select nationality"
                  isClearable
                />
              </div>
            )}
          />
          {errors.nationality && (
            <ErrorMessage className="error">
              {errors.nationality.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Marital Status</Label>
          <Controller
            name="maritalStatus"
            control={control}
            rules={{ required: "This is a required field" }}
            render={({ field }) => (
              <Select
                {...field}
                options={maritalStatusOptions}
                placeholder="Select Marital Status"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.maritalStatus && (
            <ErrorMessage className="error">
              {errors.maritalStatus.message}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup className="form-group">
          <Label>Emergency Contact Name*</Label>
          <Input
            type="text"
            placeholder="Enter the name of your emergency contact"
            {...register("emergencyContactName", {
              required: "Emergency contact name is required",
              maxLength: {
                value: 100,
                message: "Name cannot exceed 100 characters",
              },
            })}
          />
          {errors.emergencyContactName && (
            <ErrorMessage className="error">
              {errors.emergencyContactName.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Emergency Contact Relationship*</Label>
          <Controller
            name="emergencyContactRelationship"
            control={control}
            rules={{ required: "Emergency contact relationship is required" }}
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                options={relationshipOptions}
                placeholder="Select Relationship"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.emergencyContactRelationship && (
            <ErrorMessage className="error">
              {errors.emergencyContactRelationship.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Emergency Contact Phone*</Label>
          <PhoneInput className="phone-Input">
            <Controller
              name="emergencyCountryCode"
              control={control}
              rules={{ required: "Please select a Country Code" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    {...field}
                    options={phoneCountryCode}
                    placeholder="Select Country Code"
                    isClearable
                  />
                  {error && (
                    <span style={{ color: "red" }}>{error.message}</span>
                  )}
                </div>
              )}
            />
            <Input
              type="tel"
              placeholder="Enter your home phone number"
              {...register("emergencyContactPhoneNumber", {
                required: "Home phone number is required",
                pattern: {
                  value: /^[1-9]\d{6,14}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
          </PhoneInput>
          {errors.emergencyContactPhoneNumber && (
            <ErrorMessage className="error">
              {errors.emergencyContactPhoneNumber.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>LinkedIn Profile</Label>
          <Input
            type="text"
            placeholder="Enter your LinkedIn profile URL"
            {...register("linkedInProfile", {
              validate: (value) =>
                value === "" ||
                isValidLinkedInURL(value) ||
                "Please enter a valid LinkedIn profile URL",
            })}
          />
          {errors.linkedInProfile && (
            <p className="error">{errors.linkedInProfile.message}</p>
          )}
        </FormGroup>

        <FormGroup className="form-group">
          <Label>Personal Website</Label>
          <Input
            type="url"
            placeholder="Enter your personal website URL"
            {...register("personalWebsite")}
          />
        </FormGroup>
      </FormSection>

      <SubmitButton
        type="button"
        onClick={async () => {
          const output = await trigger(getValidationFields(), {
            shouldFocus: true,
          });
          console.log("output", output);
          if (!output) return;
          console.log("form values", getValues());
          setCurrentFormStep(2);
        }}
      >
        Next
      </SubmitButton>
    </div>
  );
};

export default PersonalInformationForm;
