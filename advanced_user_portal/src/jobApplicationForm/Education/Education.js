import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
// TODO: make city , country ,state and institions selected type

import Select from "react-select";
import Creatable from "react-select/creatable";
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

import {
  bachelorFieldsOfStudy,
  doctorateFieldsOfStudy,
  educationalOptions,
  masterFieldsOfStudy,
} from "../formStaticData/optionData";
import HighSchool from "./levels/highSchool";
import Inter from './levels/inter';
import Diplomas from "./levels/diploma/diploma";
import Bachelor from "./levels/bachelor/bachelor";
import Master from "./levels/master/master";

export const renderRequiredAsterisk = () => <span className="required">*</span>;

export const cgpaValidation = (value) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return "Invalid number";
  if (numericValue < 0 || numericValue > 10)
    return "CGPA must be between 0 and 10";
  return true;
};

export const currentYear = new Date().getFullYear() + 5;

const EducationFrom = ({ setCurrentFormStep }) => {
  const [hasDiploma, setHasDiploma] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    resetField,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useFormContext({
    defaultValues: {
      educationLevel: null,
      hasGaps: false,
      gapDetails: "",
      hasDiploma: "no",
      masterList: [],
      diplomaList: [],
      bachelorList: [],
      doctorateList: [],
    },
  });

  const {
    fields: diplomaFields,
    append: appendDiploma,
    remove: removeDiploma,
  } = useFieldArray({
    control,
    name: "diplomaList",
  });

  const {
    fields: bachelorFields,
    append: appendBachelor,
    remove: removeBachelor,
  } = useFieldArray({
    control,
    name: "bachelorList",
  });

  const {
    fields: masterFields,
    append: appendMaster,
    remove: removeMaster,
  } = useFieldArray({
    control,
    name: "masterList",
  });

  const {
    fields: doctorateFields,
    append: appendDoctorate,
    remove: removeDoctorate,
  } = useFieldArray({
    control,
    name: "doctorateList",
  });

  const educationLevel = watch("educationLevel");
  const hasGaps = watch("hasGaps");

  const handleEducationChange = (selectedOption) => {
    console.log("step : ", selectedOption.step);
    if (selectedOption.step === 1 || selectedOption.step === 6) {
      resetField("12th");
      resetField("bachelorList");
      resetField("masterList");
      resetField("doctorateList");
    } else if (selectedOption.step === 2) {
      resetField("bachelorList");
      resetField("masterList");
      resetField("doctorateList");
    } else if (selectedOption.step === 3) {
      resetField("doctorateList");
      resetField("masterList");

      if (bachelorFields.length === 0) {
        appendBachelor({}, { shouldFocus: false });
      }
    } else if (selectedOption.step === 4) {
      resetField("doctorateList");

      if (bachelorFields.length === 0) {
        appendBachelor({}, { shouldFocus: false });
      }
      if (masterFields.length === 0) {
        appendMaster({}, { shouldFocus: false });
      }
    } else if (selectedOption.step === 5) {
      if (bachelorFields.length === 0) {
        appendBachelor({}, { shouldFocus: false });
      }
      if (masterFields.length === 0) {
        appendMaster({}, { shouldFocus: false });
      }
      if (doctorateFields.length === 0) {
        appendDoctorate({}, { shouldFocus: false });
      }
    }
  };

  const renderDoctorateFields = (index) => {
    const countryError = errors?.doctorateList?.[index]?.country;
    const stateError = errors?.doctorateList?.[index]?.state;
    const cityError = errors?.doctorateList?.[index]?.city;
    const otherFieldError = errors?.doctorateList?.[index]?.otherField;
    const fieldOfStudyError = errors?.doctorateList?.[index]?.fieldOfStudy;
    const thesisTitleError = errors?.doctorateList?.[index]?.thesisTitle;
    const completionStatusError =
      errors?.doctorateList?.[index]?.completionStatus;
    const graduationYearError = errors?.doctorateList?.[index]?.graduationYear;
    const institutionError = errors?.doctorateList?.[index]?.institution;
    return (
      <div key={index}>
        <h4>Doctorate Degree {index + 1}</h4>
        <div className="form-group">
          <label>Field of Study: {renderRequiredAsterisk()}</label>
          <Controller
            name={`doctorateList.${index}.fieldOfStudy`}
            control={control}
            rules={{ required: "Field of study is required" }}
            render={({ field }) => (
              <Creatable
                {...field}
                options={doctorateFieldsOfStudy}
                className={`select-bootstrap ${
                  errors?.doctorateList?.[index]?.fieldOfStudy && "is-invalid"
                }`}
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            )}
          />
          {fieldOfStudyError && (
            <div className="invalid-feedback">{fieldOfStudyError.message}</div>
          )}
        </div>

        {watch(`doctorateList.${index}.fieldOfStudy`)?.value === "other" && (
          <div className="form-group mt-2">
            <label>
              Please specify the field of study: {renderRequiredAsterisk()}
            </label>
            <input
              {...register(`doctorateList.${index}.otherField`, {
                required: "Please specify the field of study",
              })}
              type="text"
              className={`form-control ${
                errors?.doctorateList?.[index]?.otherField && "is-invalid"
              }`}
            />
            {otherFieldError && (
              <div className="invalid-feedback">{otherFieldError.message}</div>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Completion Status: {renderRequiredAsterisk()}</label>
          <Controller
            name={`doctorateList.${index}.completionStatus`}
            control={control}
            rules={{ required: "Completion status is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "1", label: "1st Year" },
                  { value: "2", label: "2nd Year" },
                  { value: "3", label: "3rd Year" },
                  { value: "4", label: "4th Year" },
                  { value: "5", label: "5th Year" },
                  { value: "completed", label: "Completed" },
                ]}
                className={`select-bootstrap ${
                  errors?.doctorateList?.[index]?.completionStatus &&
                  "is-invalid"
                }`}
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            )}
          />
          {completionStatusError && (
            <div className="invalid-feedback">
              {completionStatusError.message}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Year of Graduation: {renderRequiredAsterisk()}</label>
          <Controller
            name={`doctorateList.${index}.graduationYear`}
            control={control}
            rules={{ required: "Year of completion is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={Array.from({ length: 61 }, (_, i) => ({
                  value: 2035 - i,
                  label: 2035 - i,
                }))}
                className={`select-bootstrap ${
                  graduationYearError && "is-invalid"
                }`}
                styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
              />
            )}
          />
          {graduationYearError && (
            <div className="invalid-feedback">
              {graduationYearError.message}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Thesis Title: {renderRequiredAsterisk()}</label>
          <input
            {...register(`doctorateList.${index}.thesisTitle`, {
              required: "Thesis title is required",
            })}
            type="text"
            className={`form-control ${
              errors?.doctorateList?.[index]?.thesisTitle && "is-invalid"
            }`}
          />
          {thesisTitleError && (
            <div className="invalid-feedback">{thesisTitleError.message}</div>
          )}
        </div>

        <div className="form-group">
          <label>Country: {renderRequiredAsterisk()}</label>
          <input
            {...register(`doctorateList.${index}.country`, {
              required: "Country is required",
            })}
            className={`form-control ${countryError && "is-invalid"}`}
          />
          {countryError && (
            <div className="invalid-feedback">{countryError.message}</div>
          )}
        </div>
        <div className="form-group">
          <label>State: {renderRequiredAsterisk()}</label>
          <input
            {...register(`doctorateList.${index}.state`, {
              required: "State is required",
            })}
            className={`form-control ${stateError && "is-invalid"}`}
          />
          {stateError && (
            <div className="invalid-feedback">{stateError.message}</div>
          )}
        </div>
        <div className="form-group">
          <label>City: {renderRequiredAsterisk()}</label>
          <input
            {...register(`doctorateList.${index}.city`, {
              required: "City is required",
            })}
            className={`form-control ${cityError && "is-invalid"}`}
          />
          {cityError && (
            <div className="invalid-feedback">{cityError.message}</div>
          )}
        </div>

        <div className="form-group">
          <label>Institution {renderRequiredAsterisk()}</label>
          <input
            {...register(`doctorateList.${index}.institution`, {
              required: "Institution name is required",
            })}
            className={`form-control ${
              errors?.doctorateList?.[index]?.institution && "is-invalid"
            }`}
          />
          {institutionError && (
            <div className="invalid-feedback">{institutionError.message}</div>
          )}
        </div>

        {index !== 0 && (
          <button
            type="button"
            onClick={() => removeDoctorate(index)}
            className="btn btn-danger mt-2"
          >
            Remove this doctorate
          </button>
        )}
      </div>
    );
  };

  const handleDiplomaChange = (e) => {
    const value = e.target.value;
    setHasDiploma(value);

    if (value === "yes" && diplomaFields.length === 0) {
      appendDiploma({
        title: "",
        fieldOfStudy: "",
        completionYear: "",
        country: "",
        state: "",
        city: "",
        institution: "",
        cgpa: "",
      });
    } else if (value === "no") {
      removeDiploma(); // Remove all diploma fields
    }
  };

  return (
    <div>
      <FormSection>
        <MainHeading>Education Form</MainHeading>

        <FormGroup className="form-group">
          <Label>Highest Degree Obtained</Label>
          <Controller
            name="educationLevel"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={educationalOptions}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  handleEducationChange(selectedOption);
                }}
              />
            )}
          />
          {errors.educationLevel && (
            <ErrorMessage className="error">
              This field is required
            </ErrorMessage>
          )}
        </FormGroup>

        {educationLevel && (
          <>
            <HighSchool />

            <div className="form-group">
              <label className="inter-diploma-label">
                Have you completed any diploma(s)?{" "}
                <span className="text-danger">*</span>
              </label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={hasDiploma === "yes"}
                    {...register("hasDiploma", { required: true })}
                    onChange={handleDiplomaChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={hasDiploma === "no"}
                    {...register("hasDiploma", { required: true })}
                    onChange={handleDiplomaChange}
                  />{" "}
                  No
                </label>
              </div>

              {errors.hasDiploma && (
                <span className="text-danger">
                  {errors.hasDiploma.message || "This field is required"}
                </span>
              )}
            </div>

            {hasDiploma === "yes" && (
              <Diplomas
                diplomaFields={diplomaFields}
                appendDiploma={appendDiploma}
                removeDiploma={removeDiploma}
              />
            )}

            {educationLevel.step > 1 && <Inter />}

            {educationLevel.step > 2 && (
              <Bachelor
                bachelorFields={bachelorFields}
                appendBachelor={appendBachelor}
                removeBachelor={removeBachelor}
              />
            )}

            {educationLevel.step > 3 && (
              <Master
                masterFields={masterFields}
                appendMaster={appendMaster}
                removeMaster={removeMaster}
              />
            )}

            {educationLevel.step > 4 && (
              <>
                <div className="section">
                  <h4>Doctorate Degree Details:</h4>
                  {doctorateFields.map((field, index) =>
                    renderDoctorateFields(index)
                  )}

                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => appendDoctorate({})}
                  >
                    + Add Doctorate Degree
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <div className="form-group">
          <label>Do you have any gaps in education?</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="gapsCheckbox"
              className="checkbox-input"
              {...register("hasGaps")}
            />
            <label htmlFor="gapsCheckbox" className="checkbox-label">
              Yes
            </label>

            {errors.hasGaps && (
              <ErrorMessage className="error">
                This field is required
              </ErrorMessage>
            )}
          </div>
        </div>
        {hasGaps && (
          <div className="form-group">
            <label>Please explain the gaps in your education:</label>
            <textarea
              className="form-control"
              rows="3"
              {...register("gapDetails", {
                required: true,
              })}
            ></textarea>
            {errors.gapDetails && (
              <ErrorMessage className="error">
                This field is required
              </ErrorMessage>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Any other relevant qualifications or certifications?</label>
          <textarea
            className="form-control"
            {...register("otherReleventQualification")}
            rows="3"
          ></textarea>
        </div>
      </FormSection>
      <button
        type="button"
        onClick={() => {
          //TODO: run form validation
          setCurrentFormStep(1);
        }}
      >
        Back
      </button>
      <button
        type="button"
        onClick={async () => {
          //TODO: run form validation
          const output = await trigger();
          console.log(output);
          if (!output) return;
          setCurrentFormStep(3);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default EducationFrom;