import React, { useEffect } from "react";
import { renderRequiredAsterisk } from "../../Education";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { Controller, useFormContext } from "react-hook-form";
import cityOptions from "../../../formStaticData/optionCity.json";
import countryOptions from "../../../formStaticData/optionCountry.json";
import stateOptions from "../../../formStaticData/optionState.json";
import { currentYear, cgpaValidation } from "../../Education";
import { BachelorDegreeOptions } from "../../../formStaticData/optionData";
import {
  bachelorFieldsOfStudy,
  institionOptions,
} from "../../../formStaticData/optionData";

const RenderBachelorFields = ({ index, removeBachelor }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const country = watch(`bachelorList.${index}.country`);
  const state = watch(`bachelorList.${index}.state`);
  const city = watch(`bachelorList.${index}.city`);

  // Reset state and city when country changes
  useEffect(() => {
    setValue(`bachelorList.${index}.state`, null);
    setValue(`bachelorList.${index}.city`, null);
    setValue(`bachelorList.${index}.institution`, null);
  }, [country, setValue, index]);

  // Reset city when state changes
  useEffect(() => {
    setValue(`bachelorList.${index}.city`, null);
    setValue(`bachelorList.${index}.institution`, null);
  }, [state, setValue, index]);

  useEffect(() => {
    setValue(`bachelorList.${index}.institution`, null);
  }, [city, setValue, index]);

  const degreeTypeError = errors?.bachelorList?.[index]?.degreeType;
  const countryError = errors?.bachelorList?.[index]?.country;
  const stateError = errors?.bachelorList?.[index]?.state;
  const cityError = errors?.bachelorList?.[index]?.city;
  const otherDegreeError = errors?.bachelorList?.[index]?.otherDegree;
  const fieldOfStudyError = errors?.bachelorList?.[index]?.fieldOfStudy;
  const completionStatusError = errors?.bachelorList?.[index]?.completionStatus;
  const graduationYearError = errors?.bachelorList?.[index]?.graduationYear;
  const institutionError = errors?.bachelorList?.[index]?.institution;
  const cgpaError = errors?.bachelorList?.[index]?.cgpa;
  return (
    <div key={index} className="bachelor-degree-section">
      <h4>Bachelor's Degree {index + 1}</h4>

      <div className="form-group">
        <label>Degree Type: {renderRequiredAsterisk()}</label>
        <Controller
          name={`bachelorList.${index}.degreeType`}
          control={control}
          rules={{ required: "Degree Type is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={BachelorDegreeOptions}
              className="select-bootstrap"
              styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
            />
          )}
        />
        {degreeTypeError && (
          <p className="error-message">{degreeTypeError.message}</p>
        )}
      </div>

      {watch(`bachelorList.${index}.degreeType`)?.value === "Other" && (
        <div className="form-group mt-2">
          <label>Please specify the degree: {renderRequiredAsterisk()}</label>
          <input
            {...register(`bachelorList.${index}.otherDegree`, {
              required: "Please specify the degree",
            })}
            type="text"
            className="form-control"
          />
          {otherDegreeError && (
            <p className="error-message">{otherDegreeError.message}</p>
          )}
        </div>
      )}

      <div className="form-group">
        <label>Field of Study: {renderRequiredAsterisk()}</label>
        <Controller
          name={`bachelorList.${index}.fieldOfStudy`}
          control={control}
          rules={{ required: "Field of Study is required" }}
          render={({ field }) => (
            <Creatable
              {...field}
              isClearable
              options={bachelorFieldsOfStudy}
              className="select-bootstrap"
              styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
            />
          )}
        />
        {fieldOfStudyError && (
          <p className="error-message">{fieldOfStudyError.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Completion Status: {renderRequiredAsterisk()}</label>
        <Controller
          name={`bachelorList.${index}.completionStatus`}
          control={control}
          rules={{ required: "Completion Status is required" }}
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
              className="select-bootstrap"
              styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
            />
          )}
        />
        {completionStatusError && (
          <p className="error-message">{completionStatusError.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Year of Graduation: {renderRequiredAsterisk()}</label>
        <Controller
          name={`bachelorList.${index}.graduationYear`}
          control={control}
          rules={{ required: "Year of Graduation is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={Array.from({ length: 61 }, (_, i) => {
                const year = currentYear - i;
                return { value: year, label: year };
              })}
              className="select-bootstrap"
              styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
            />
          )}
        />
        {graduationYearError && (
          <p className="error-message">{graduationYearError.message}</p>
        )}
      </div>
      <div className="form-group">
        <label>Country: {renderRequiredAsterisk()}</label>
        <Controller
          name={`bachelorList.${index}.country`}
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
          name={`bachelorList.${index}.state`}
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
          name={`bachelorList.${index}.city`}
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
          name={`bachelorList.${index}.institution`}
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
        <label>CGPA/Percentage: {renderRequiredAsterisk()}</label>
        <input
          {...register(`bachelorList.${index}.cgpa`, {
            required: "CGPA/Percentage is required",
            validate: cgpaValidation,
          })}
          type="text"
          className="form-control"
        />
        {cgpaError && <p className="error-message">{cgpaError.message}</p>}
      </div>

      {index !== 0 && (
        <button type="button" onClick={() => removeBachelor(index)}>
          Remove this degree
        </button>
      )}
    </div>
  );
};

const Bachelor = ({ bachelorFields, appendBachelor, removeBachelor }) => {
  return (
    <div className="section">
      <h4>Bachelor's Degree Details:</h4>
      {bachelorFields.map((field, index) => (
        <RenderBachelorFields
          key={field.id}
          index={index}
          removeBachelor={removeBachelor}
        />
      ))}
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={() => appendBachelor({})}
      >
        + Add Bachelor's Degree
      </button>
    </div>
  );
};

export default Bachelor;