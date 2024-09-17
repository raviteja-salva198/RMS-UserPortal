import React, { useEffect } from "react";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import "./index.css";
import { jobTitles } from "../formStaticData/optionData";
import { renderRequiredAsterisk } from "../Education/Education";

const WorkExperience = ({ setCurrentFormStep }) => {
  const {
    register,
    control,
    watch,
    trigger,
    getValues,
    resetField,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      isFresher: "",
      experiences: [
        {
          company: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
          salary: "",
          employmentType: "",
        },
      ],
    },
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const isFresher = watch("isFresher");

  useEffect(() => {
    if (isFresher === "no" && experienceFields?.length === 0) {
      appendExperience({
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        salary: "",
        employmentType: "",
      });
    } else if (isFresher === "yes" && experienceFields?.length > 0) {
      resetField("experiences");
    }
  }, [isFresher, appendExperience, experienceFields?.length]);

  return (
    <div className="work-experience">
      <h2 className="main-heading-for-page">Work Experience</h2>
      <div>
        <div className="fresher-section">
          <label>Are you a fresher (no prior work experience)?</label>
          <div>
            <label>
              <input
                {...register("isFresher", { required: true })}
                type="radio"
                value="yes"
              />
              Yes, I am a fresher
            </label>
            <label>
              <input
                {...register("isFresher", { required: true })}
                type="radio"
                value="no"
              />
              No, I have work experience
            </label>
          </div>
        </div>
        {isFresher && isFresher !== "yes" && (
          <div className="experience-details">
            {experienceFields.map((field, index) => (
              <div key={field.id} className="experience">
                <div>
                  <div className="form-group">
                    <label>Company Name: {renderRequiredAsterisk()}</label>
                    <input
                      {...register(`experiences.${index}.company`, {
                        required: "Company Name is required",
                      })}
                      className={`form-control ${
                        errors?.experiences?.[index]?.company
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {errors?.experiences?.[index]?.company && (
                      <div className="invalid-feedback">
                        {errors.experiences[index].company.message}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Job Title: {renderRequiredAsterisk()}</label>
                    <Controller
                      name={`experiences.${index}.jobTitle`}
                      control={control}
                      rules={{ required: "Job Title is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`form-control ${
                            errors?.experiences?.[index]?.jobTitle
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="">Select Job Title</option>
                          {jobTitles.map((title, idx) => (
                            <option key={idx} value={title}>
                              {title}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors?.experiences?.[index]?.jobTitle && (
                      <div className="invalid-feedback">
                        {errors.experiences[index].jobTitle.message}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Employment Dates: {renderRequiredAsterisk()}</label>
                    <div className="date-picker">
                      <label>Start Date: {renderRequiredAsterisk()}</label>
                      <input
                        type="date"
                        {...register(`experiences.${index}.startDate`, {
                          required: "Start Date is required",
                        })}
                        className={`form-control ${
                          errors?.experiences?.[index]?.startDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {errors?.experiences?.[index]?.startDate && (
                        <div className="invalid-feedback">
                          {errors.experiences[index].startDate.message}
                        </div>
                      )}
                    </div>
                    <div className="date-picker">
                      <label>End Date: {renderRequiredAsterisk()}</label>
                      <input
                        type="date"
                        {...register(`experiences.${index}.endDate`, {
                          required: "End Date is required",
                        })}
                        className={`form-control ${
                          errors?.experiences?.[index]?.endDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {errors?.experiences?.[index]?.endDate && (
                        <div className="invalid-feedback">
                          {errors.experiences[index].endDate.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Employment Type: {renderRequiredAsterisk()}</label>
                    <Controller
                      name={`experiences.${index}.employmentType`}
                      control={control}
                      rules={{ required: "Employment Type is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`form-control ${
                            errors?.experiences?.[index]?.employmentType
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="">Select Employment Type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      )}
                    />
                    {errors?.experiences?.[index]?.employmentType && (
                      <div className="invalid-feedback">
                        {errors.experiences[index].employmentType.message}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      Responsibilities and Achievements:{" "}
                      {renderRequiredAsterisk()}
                    </label>
                    <textarea
                      {...register(`experiences.${index}.responsibilities`, {
                        required: "Responsibilities are required",
                      })}
                      className={`form-control ${
                        errors?.experiences?.[index]?.responsibilities
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {errors?.experiences?.[index]?.responsibilities && (
                      <div className="invalid-feedback">
                        {errors.experiences[index].responsibilities.message}
                      </div>
                    )}
                  </div>
                  {/* <div className="form-group">
                    <label>Reason for Leaving Previous Job:</label>
                    <input
                      {...register(`experiences.${index}.reasonForLeaving`)}
                      className="form-control"
                    />
                  </div> */}
                  <div className="form-group">
                    <label>Salary:</label>
                    <input
                      {...register(`experiences.${index}.salary`, {
                        required: "Salary is required",
                      })}
                      className={`form-control ${
                        errors?.experiences?.[index]?.salary ? "is-invalid" : ""
                      }`}
                    />
                    {errors?.experiences?.[index]?.salary && (
                      <div className="invalid-feedback">
                        {errors.experiences[index].salary.message}
                      </div>
                    )}
                  </div>
                </div>
                {index !== 0 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-experience-button btn btn-primary mt-2"
              onClick={() =>
                appendExperience({
                  company: "",
                  jobTitle: "",
                  startDate: "",
                  endDate: "",
                  responsibilities: "",
                  salary: "",
                  employmentType: "",
                })
              }
            >
              Add Another Job Experience
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setCurrentFormStep(3);
            // trigger run form validation
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={async () => {
            const output = await trigger();
            console.log("output", output);
            if (!output) return;
            console.log("form values", getValues());
            setCurrentFormStep(5);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkExperience;
