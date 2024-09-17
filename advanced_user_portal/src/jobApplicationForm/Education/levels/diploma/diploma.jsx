import React, { useEffect } from "react";
import { renderRequiredAsterisk } from "../../Education";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { Controller, useFormContext } from "react-hook-form";
import cityOptions from "../../../formStaticData/optionCity.json";
import countryOptions from "../../../formStaticData/optionCountry.json";
import stateOptions from "../../../formStaticData/optionState.json";
import { currentYear, cgpaValidation } from "../../Education";
import {
  diplomaFieldsOfStudy,
  institionOptions,
} from "../../../formStaticData/optionData";

const RenderDiplomaFields = ({ index, removeDiploma }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const country = watch(`diplomaList.${index}.country`);
  const state = watch(`diplomaList.${index}.state`);
  const city = watch(`diplomaList.${index}.city`);

  // Reset state and city when country changes
  useEffect(() => {
    setValue(`diplomaList.${index}.state`, null);
    setValue(`diplomaList.${index}.city`, null);
    setValue(`diplomaList.${index}.institution`, null);
  }, [country, setValue]);

  // Reset city when state changes
  useEffect(() => {
    setValue(`diplomaList.${index}.city`, null);
    setValue(`diplomaList.${index}.institution`, null);
  }, [state, setValue]);

  useEffect(() => {
    setValue(`diplomaList.${index}.institution`, null);
  }, [city, setValue]);

  const titleError = errors?.diplomaList?.[index]?.title;
  const countryError = errors?.diplomaList?.[index]?.country;
  const stateError = errors?.diplomaList?.[index]?.state;
  const cityError = errors?.diplomaList?.[index]?.city;
  const fieldOfStudyError = errors?.diplomaList?.[index]?.fieldOfStudy;
  const completionYearError = errors?.diplomaList?.[index]?.completionYear;
  const institutionError = errors?.diplomaList?.[index]?.institution;
  const cgpaError = errors?.diplomaList?.[index]?.cgpa;
  return (
    <div key={index} className="diploma-section">
      <h5>Diploma {index + 1}</h5>

      <div className="form-group">
        <label>Diploma Name: {renderRequiredAsterisk()}</label>
        <input
          type="text"
          className={`form-control ${
            errors?.diplomaList?.[index]?.title && "is-invalid"
          }`}
          {...register(`diplomaList.${index}.title`, {
            required: "Diploma Name is required",
          })}
        />
        {titleError && (
          <div className="invalid-feedback">{titleError.message}</div>
        )}
      </div>

      <div className="form-group">
        <label>Field of Study: {renderRequiredAsterisk()}</label>
        <Controller
          control={control}
          name={`diplomaList.${index}.fieldOfStudy`}
          rules={{ required: "Field of Study is required" }}
          render={({ field }) => (
            <>
              <Creatable
                options={diplomaFieldsOfStudy}
                {...field}
                className={`select-bootstrap ${
                  errors?.diplomaList?.[index]?.fieldOfStudy && "is-invalid"
                }`}
                styles={{
                  control: (base) => ({ ...base, cursor: "pointer" }),
                }}
              />
              {fieldOfStudyError && (
                <div className="invalid-feedback">
                  {fieldOfStudyError.message}
                </div>
              )}
            </>
          )}
        />
      </div>

      <div className="form-group">
        <label>Year of Completion: {renderRequiredAsterisk()}</label>
        <Controller
          name={`diplomaList.${index}.completionYear`}
          control={control}
          rules={{ required: "Year of Completion is required" }}
          render={({ field }) => (
            <>
              <Select
                {...field}
                options={Array.from({ length: 61 }, (_, i) => {
                  const year = currentYear - i;
                  return { value: year, label: year };
                })}
                className={`select-bootstrap ${
                  errors?.diplomaList?.[index]?.completionYear && "is-invalid"
                }`}
                styles={{
                  control: (base) => ({ ...base, cursor: "pointer" }),
                }}
              />
              {completionYearError && (
                <div className="invalid-feedback">
                  {completionYearError.message}
                </div>
              )}
            </>
          )}
        />
      </div>

      <div className="form-group">
        <label>Country: {renderRequiredAsterisk()}</label>
        <Controller
          name={`diplomaList.${index}.country`}
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={countryOptions}
              className={`react-select ${countryError && "is-invalid"}`}
            />
          )}
        />
        {countryError && (
          <div className="invalid-feedback">{countryError.message}</div>
        )}
      </div>

      <div className="form-group">
        <label>State: {renderRequiredAsterisk()}</label>
        <Controller
          name={`diplomaList.${index}.state`}
          control={control}
          rules={{ required: "State is required" }}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={!country}
              options={
                country &&
                stateOptions.filter(
                  (state) => state.country_id === country?.country_id
                )
              }
              className={`react-select ${stateError && "is-invalid"}`}
            />
          )}
        />
        {stateError && (
          <div className="invalid-feedback">{stateError.message}</div>
        )}
      </div>

      <div className="form-group">
        <label>City: {renderRequiredAsterisk()}</label>
        <Controller
          name={`diplomaList.${index}.city`}
          control={control}
          rules={{ required: "city is required" }}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={!state}
              options={
                state &&
                cityOptions.filter((city) => city.state_id === state?.state_id)
              }
              className={`react-select ${cityError && "is-invalid"}`}
            />
          )}
        />
        {cityError && (
          <div className="invalid-feedback">{cityError.message}</div>
        )}
      </div>

      <div className="form-group">
        <label>Institution: {renderRequiredAsterisk()}</label>
        <Controller
          name={`diplomaList.${index}.institution`}
          control={control}
          rules={{ required: "institution is required" }}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={!city}
              options={
                city &&
                institionOptions.filter(
                  (instition) =>
                    instition.country_shortname === country?.shortname
                )
              }
              className={`react-select ${institutionError && "is-invalid"}`}
            />
          )}
        />
        {institutionError && (
          <div className="invalid-feedback">{institutionError.message}</div>
        )}
      </div>

      <div className="form-group">
        <label>Percentage/CGPA: {renderRequiredAsterisk()}</label>
        <input
          type="text"
          className={`form-control ${
            errors?.diplomaList?.[index]?.cgpa && "is-invalid"
          }`}
          {...register(`diplomaList.${index}.cgpa`, {
            required: "Percentage/CGPA is required",
            validate: cgpaValidation,
          })}
        />
        {cgpaError && (
          <div className="invalid-feedback">{cgpaError.message}</div>
        )}
      </div>

      {index !== 0 && (
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => removeDiploma(index)}
        >
          Remove Diploma
        </button>
      )}
    </div>
  );
};

const Diplomas = ({ diplomaFields, appendDiploma, removeDiploma }) => {
  return (
    <div className="section">
      <h4>Diploma Details:</h4>
      {diplomaFields.map((field, index) => (
        <RenderDiplomaFields
          key={field.id}
          index={index}
          removeDiploma={removeDiploma}
        />
      ))}
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={() =>
          appendDiploma({
            title: "",
            fieldOfStudy: "",
            completionYear: "",
            country: "",
            state: "",
            city: "",
            institution: "",
            cgpa: "",
          })
        }
      >
        + Add Diploma
      </button>
    </div>
  );
};

export default Diplomas;
