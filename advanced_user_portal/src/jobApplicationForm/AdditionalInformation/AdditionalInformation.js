import React, { useEffect, useState } from "react";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import Creatable from "react-select/creatable";
import toast from "react-hot-toast";
import { skillOptions } from "../formStaticData/optionData";
import { faXmark, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const workshopTypes = [
  "Conference",
  "Seminar",
  "Webinar",
  "Workshop",
  "Training",
  "Course",
  "Other",
];

const Countries = {
  "United States": ["Tourist", "Business", "Student", "Work"],
  Canada: ["Visitor", "Study", "Work"],
  "United Kingdom": ["Visitor", "Student", "Work"],
  Australia: ["Tourist", "Business", "Student", "Work"],
  Germany: ["Tourist", "Business", "Student", "Work"],
  France: ["Tourist", "Business", "Student", "Work"],
  India: ["Tourist", "Business", "Student", "Work"],
  China: ["Tourist", "Business", "Student", "Work"],
  Japan: ["Tourist", "Business", "Student", "Work"],
  Brazil: ["Tourist", "Business", "Student", "Work"],
  "South Africa": ["Tourist", "Business", "Student", "Work"],
  Mexico: ["Tourist", "Business", "Student", "Work"],
  Italy: ["Tourist", "Business", "Student", "Work"],
  Spain: ["Tourist", "Business", "Student", "Work"],
};

const AdditionalInformation = ({ setCurrentFormStep }) => {
  const {
    register,
    control,
    watch,
    resetField,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormContext({
    defaultValues: {
      passportDetails: {
        hasValidPassport: false,
        passportNumber: "",
        passportDocument: null,
        hasValidVisa: false,
      },
      visaEntries: [],
      skills: [],
      trainingWorkShop: [
        {
          title: "",
          type: "",
          date: "",
          description: "",
        },
      ],
      resume: "",
      language: [],
      workSample: [],
      professionalAffiliation: [],
      awardsHonor: [],
      publication: [],
      volunteer: [],
      hobbie: [],
    },
  });

  const {
    fields: visaFields,
    append: appendVisa,
    remove: removeVisa,
  } = useFieldArray({
    control,
    name: "visaEntry",
  });

  const {
    fields: workSampleFields,
    append: appendWorkSample,
    remove: removeWorkSample,
  } = useFieldArray({
    control,
    name: "workSample",
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "language",
  });

  const {
    fields: workShopFields,
    append: appendWorkShop,
    remove: removeWorkShop,
  } = useFieldArray({
    control,
    name: "trainingWorkShop",
  });

  const {
    fields: hobbieFields,
    append: appendHobbie,
    remove: removeHobbie,
  } = useFieldArray({
    control,
    name: "hobbie",
  });

  const {
    fields: volunteerFields,
    append: appendVolunteer,
    remove: removeVolunteer,
  } = useFieldArray({
    control,
    name: "volunteer",
  });

  const {
    fields: awardsHonorFields,
    append: appendAwardsHonor,
    remove: removeAwardsHonor,
  } = useFieldArray({
    control,
    name: "awardsHonor",
  });

  const {
    fields: professionalAffiliationFields,
    append: appendProfessionalAffiliation,
    remove: removeProfessionalAffiliation,
  } = useFieldArray({
    control,
    name: "professionalAffiliation",
  });

  const {
    fields: publicationFields,
    append: appendPublication,
    remove: removePublication,
  } = useFieldArray({
    control,
    name: "publication",
  });

  const hasValidPassport = watch("passportDetails.hasValidPassport");
  const hasValidVisa = watch("passportDetails.hasValidVisa");

  useEffect(() => {
    if (!hasValidPassport) {
      resetField("passportDetails.passportNumber");
      resetField("passportDetails.passportDocument");
      resetField("passportDetails.hasValidVisa");
      setValue("visaEntry", []);
    }
    console.log("vis", hasValidVisa, visaFields.length);
    if (hasValidVisa && visaFields?.length === 0) {
      appendVisa({
        country: "",
        visaType: "",
        visaNumber: "",
        visaDocument: null,
      });
    }

    if (!hasValidVisa && visaFields.length > 0) {
      setValue("visaEntry", []);
    }
    console.log("visa", visaFields.length);
  }, [hasValidPassport, resetField, visaFields.length, setValue, hasValidVisa]);

  return (
    <div className="form-section">
      <h2 className="main-heading-for-page">Additional Information</h2>
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="hasValidPassport"
          className="checkbox-input"
          {...register("passportDetails.hasValidPassport")}
        />
        <label htmlFor="hasValidPassport" className="checkbox-label">
          Do you have a valid Passport?
        </label>
      </div>

      {hasValidPassport && (
        <div className="row">
          <div className="col">
            <label>Passport Number:</label>
            <input
              type="text"
              className={`form-control ${
                errors.passportDetails?.passportNumber ? "is-invalid" : ""
              }`}
              {...register("passportDetails.passportNumber", {
                required: "Passport number is required",
              })}
            />
            {errors.passportDetails?.passportNumber && (
              <div className="invalid-feedback">
                {errors.passportDetails.passportNumber.message}
              </div>
            )}
          </div>

          <div className="col">
            <label>Passport Document G-drive Link</label>
            <input
              type="text"
              className={`form-control ${
                errors.passportDetails?.passportDocument ? "is-invalid" : ""
              }`}
              {...register("passportDetails.passportDocument", {
                required: "Document link is required",
              })}
            />
            {errors.passportDetails?.passportDocument && (
              <div className="invalid-feedback">
                {errors.passportDetails.passportDocument.message}
              </div>
            )}
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="hasValidVisa"
              className="checkbox-input"
              {...register("passportDetails.hasValidVisa")}
            />
            <label htmlFor="hasValidVisa" className="checkbox-label">
              Do you have a valid visa?
            </label>
          </div>

          {hasValidVisa && (
            <div className="form-group">
              <div className="visa-header">
                <h3>Visa Information</h3>
                <button
                  type="button"
                  onClick={() =>
                    appendVisa({
                      country: "",
                      visaType: "",
                      visaNumber: "",
                      visaDocument: "",
                    })
                  }
                  className="btn btn-primary btn-sm"
                >
                  Add Visa
                </button>
              </div>

              <div className="visa-input--container">
                {visaFields.map((field, index) => (
                  <div key={field.id} className="row visa-entry">
                    <div className="col">
                      <label>Country</label>
                      <select
                        className={`form-control ${
                          errors.visaEntry?.[index]?.country ? "is-invalid" : ""
                        }`}
                        {...register(`visaEntry.${index}.country`, {
                          required: "Country is required",
                        })}
                      >
                        <option value="">Select a country</option>
                        {Object.keys(Countries).map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.visaEntry?.[index]?.country && (
                        <div className="invalid-feedback">
                          {errors.visaEntry[index].country.message}
                        </div>
                      )}
                    </div>

                    <div className="col">
                      <label>Visa Type</label>
                      <select
                        className={`form-control ${
                          errors.visaEntry?.[index]?.visaType
                            ? "is-invalid"
                            : ""
                        }`}
                        {...register(`visaEntry.${index}.visaType`, {
                          required: "Visa type is required",
                        })}
                      >
                        <option value="">Select a visa type</option>
                        {watch(`visaEntry.${index}.country`) &&
                          Countries[watch(`visaEntry.${index}.country`)].map(
                            (visaType) => (
                              <option key={visaType} value={visaType}>
                                {visaType}
                              </option>
                            )
                          )}
                      </select>
                      {errors.visaEntry?.[index]?.visaType && (
                        <div className="invalid-feedback">
                          {errors.visaEntry[index].visaType.message}
                        </div>
                      )}
                    </div>

                    <div className="col">
                      <label>Visa Number</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.visaEntry?.[index]?.visaNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        {...register(`visaEntry.${index}.visaNumber`, {
                          required: "Visa number is required",
                        })}
                      />
                      {errors.visaEntry?.[index]?.visaNumber && (
                        <div className="invalid-feedback">
                          {errors.visaEntry[index].visaNumber.message}
                        </div>
                      )}
                    </div>

                    <div className="col">
                      <label>Visa Document G-drive Link</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.visaEntry?.[index]?.visaDocument
                            ? "is-invalid"
                            : ""
                        }`}
                        {...register(`visaEntry.${index}.visaDocument`, {
                          required: "Document link is required",
                        })}
                      />
                      {errors.visaEntry?.[index]?.visaDocument && (
                        <div className="invalid-feedback">
                          {errors.visaEntry[index].visaDocument.message}
                        </div>
                      )}
                    </div>

                    {index !== 0 && (
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => removeVisa(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="form-group">
        <label>Skills and Certifications</label>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Creatable
              {...field}
              isMulti
              options={skillOptions}
              placeholder="Select skills..."
            />
          )}
        />
      </div>

      <div className="form-group">
        <h2>Training and Workshops</h2>
        <button
          type="button"
          onClick={() =>
            appendWorkShop({
              title: "",
              type: "",
              date: "",
              description: "",
            })
          }
        >
          Add Workshop
        </button>

        {workShopFields?.map((field, index) => {
          return (
            <div className="input-group" key={field.id}>
              <input
                type="text"
                placeholder="Title"
                className={`form-control ${
                  errors.trainingWorkShop?.[index]?.title ? "is-invalid" : ""
                }`}
                {...register(`trainingWorkShop[${index}].title`, {
                  required: "Title is required",
                })}
              />
              {errors.trainingWorkShop?.[index]?.title && (
                <div className="invalid-feedback">
                  {errors.trainingWorkShop[index].title.message}
                </div>
              )}

              <select
                className={`form-control ${
                  errors.trainingWorkShop?.[index]?.type ? "is-invalid" : ""
                }`}
                {...register(`trainingWorkShop[${index}].type`, {
                  required: "Type is required",
                })}
              >
                <option value="">Select Type</option>
                {workshopTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.trainingWorkShop?.[index]?.type && (
                <div className="invalid-feedback">
                  {errors.trainingWorkShop[index].type.message}
                </div>
              )}

              <input
                type="date"
                className={`form-control ${
                  errors.trainingWorkShop?.[index]?.date ? "is-invalid" : ""
                }`}
                {...register(`trainingWorkShop[${index}].date`, {
                  required: "Date is required",
                })}
              />
              {errors.trainingWorkShop?.[index]?.date && (
                <div className="invalid-feedback">
                  {errors.trainingWorkShop[index].date.message}
                </div>
              )}

              <textarea
                placeholder="Description"
                className={`form-control ${
                  errors.trainingWorkShop?.[index]?.description
                    ? "is-invalid"
                    : ""
                }`}
                {...register(`trainingWorkShop[${index}].description`, {
                  required: "Description is required",
                })}
              />
              {errors.trainingWorkShop?.[index]?.description && (
                <div className="invalid-feedback">
                  {errors.trainingWorkShop[index].description.message}
                </div>
              )}

              <button
                type="button"
                className="add-button"
                onClick={() => removeWorkShop(index)}
              >
                <FontAwesomeIcon icon={faXmark} /> Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* new language */}
      <div>
        <div className="form-group">
          <label>Language:</label>
          <button
            type="button"
            onClick={() => {
              appendLanguage({
                name: "",
                speak: "",
                write: "",
                read: "",
              });
            }}
          >
            Add Language
          </button>
        </div>
        {languageFields.map((field, index) => (
          <div key={field.id} className="language-section">
            <div className="form-group">
              <label>Language</label>
              <input
                className={`form-control ${
                  errors.language?.[index]?.name ? "is-invalid" : ""
                }`}
                {...register(`language.${index}.name`, {
                  required: "This field is required",
                })}
              />
              {errors.language?.[index]?.name && (
                <div className="invalid-feedback">
                  {errors.language[index].name.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Speak:</label>
              <select
                className={`form-control ${
                  errors.language?.[index]?.speak ? "is-invalid" : ""
                }`}
                {...register(`language.${index}.speak`, {
                  required: "Please select a level",
                })}
              >
                <option value="">Select level</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              {errors.language?.[index]?.speak && (
                <div className="invalid-feedback">
                  {errors.language[index].speak.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Write:</label>
              <select
                className={`form-control ${
                  errors.language?.[index]?.write ? "is-invalid" : ""
                }`}
                {...register(`language.${index}.write`, {
                  required: "Please select a level",
                })}
              >
                <option value="">Select level</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              {errors.language?.[index]?.write && (
                <div className="invalid-feedback">
                  {errors.language[index].write.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Read:</label>
              <select
                className={`form-control ${
                  errors.language?.[index]?.read ? "is-invalid" : ""
                }`}
                {...register(`language.${index}.read`, {
                  required: "Please select a level",
                })}
              >
                <option value="">Select level</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              {errors.language?.[index]?.read && (
                <div className="invalid-feedback">
                  {errors.language[index].read.message}
                </div>
              )}
            </div>

            <button type="button" onClick={() => removeLanguage(index)}>
              Remove Language
            </button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label>Resume/CV</label>
        <input
          type="text"
          {...register("resume", {
            required: "This is required",
          })}
        />
      </div>

      <div className="form-group">
        <button type="button" onClick={() => appendWorkSample("")}>
          +Add
        </button>
        <label>Work Sample</label>
        {workSampleFields.map((field, index) => (
          <div key={field.id}>
            <input
              className={`form-control ${
                errors.workSample?.[index] ? "is-invalid" : ""
              }`}
              {...register(`workSample.${index}`, {
                required: "This field is required",
              })}
            />
            {errors.workSample?.[index] && (
              <div className="invalid-feedback">
                {errors.workSample[index].message}
              </div>
            )}
            <button type="button" onClick={() => removeWorkSample(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <button type="button" onClick={() => appendProfessionalAffiliation("")}>
          +Add
        </button>
        <label>Professional Affiliations</label>
        {professionalAffiliationFields.map((field, index) => (
          <div key={field.id}>
            <input
              className={`form-control ${
                errors.professionalAffiliation?.[index] ? "is-invalid" : ""
              }`}
              {...register(`professionalAffiliation.${index}`, {
                required: "This field is required",
              })}
            />
            {errors.professionalAffiliation?.[index] && (
              <div className="invalid-feedback">
                {errors.professionalAffiliation[index].message}
              </div>
            )}
            <button
              type="button"
              onClick={() => removeProfessionalAffiliation(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <button type="button" onClick={() => appendAwardsHonor("")}>
          +Add
        </button>
        <label>Awards and Honors</label>
        {awardsHonorFields.map((field, index) => (
          <div key={field.id}>
            <input
              className={`form-control ${
                errors.awardsHonor?.[index] ? "is-invalid" : ""
              }`}
              {...register(`awardsHonor.${index}`, {
                required: "This field is required",
              })}
            />
            {errors.awardsHonor?.[index] && (
              <div className="invalid-feedback">
                {errors.awardsHonor[index].message}
              </div>
            )}
            <button type="button" onClick={() => removeAwardsHonor(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <button type="button" onClick={() => appendPublication("")}>
          +Add
        </button>
        <label>Publications</label>
        {publicationFields.map((field, index) => (
          <div key={field.id}>
            <input
              className={`form-control ${
                errors.publication?.[index] ? "is-invalid" : ""
              }`}
              {...register(`publication.${index}`, {
                required: "This field is required",
              })}
            />
            {errors.publication?.[index] && (
              <div className="invalid-feedback">
                {errors.publication[index].message}
              </div>
            )}
            <button type="button" onClick={() => removePublication(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <button type="button" onClick={() => appendVolunteer("")}>
          +Add
        </button>
        <label>Volunteer Experience</label>
        {volunteerFields.map((field, index) => (
          <div key={field.id}>
            <input
              className={`form-control ${
                errors.volunteer?.[index] ? "is-invalid" : ""
              }`}
              {...register(`volunteer.${index}`, {
                required: "This field is required",
              })}
            />
            {errors.volunteer?.[index] && (
              <div className="invalid-feedback">
                {errors.volunteer[index].message}
              </div>
            )}
            <button type="button" onClick={() => removeVolunteer(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <button type="button" onClick={() => appendHobbie("")}>
          +Add
        </button>
        <label>Hobbies and Interests</label>
        {hobbieFields.map((field, index) => (
          <div key={field.id}>
            <input
              className={`form-control ${
                errors.hobbie?.[index] ? "is-invalid" : ""
              }`}
              {...register(`hobbie.${index}`, {
                required: "This field is required",
              })}
            />
            {errors.hobbie?.[index] && (
              <div className="invalid-feedback">
                {errors.hobbie[index].message}
              </div>
            )}
            <button type="button" onClick={() => removeHobbie(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => {
          setCurrentFormStep(4);
        }}
      >
        Prev
      </button>
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </div>
  );
};

export default AdditionalInformation;