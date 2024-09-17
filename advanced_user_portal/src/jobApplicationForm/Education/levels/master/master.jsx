import React, { useEffect } from "react";
import { renderRequiredAsterisk } from "../../Education";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { Controller, useFormContext } from "react-hook-form";
import cityOptions from "../../../formStaticData/optionCity.json";
import countryOptions from "../../../formStaticData/optionCountry.json";
import stateOptions from "../../../formStaticData/optionState.json";
import { currentYear, cgpaValidation } from "../../Education";
import { MasterDegreeOptions } from "../../../formStaticData/optionData";
import {
  masterFieldsOfStudy,
  institionOptions,
} from "../../../formStaticData/optionData";

const RenderMasterFields = ({ index, removeMaster }) => {
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
  }, [country, setValue]);

  // Reset city when state changes
  useEffect(() => {
    setValue(`bachelorList.${index}.city`, null);
    setValue(`bachelorList.${index}.institution`, null);
  }, [state, setValue]);

  useEffect(() => {
    setValue(`bachelorList.${index}.institution`, null);
  }, [city, setValue]);

  const degreeTypeError = errors?.masterList?.[index]?.degreeType;
  const countryError = errors?.masterList?.[index]?.country;
  const stateError = errors?.masterList?.[index]?.state;
  const cityError = errors?.masterList?.[index]?.city;
  const otherDegreeError = errors?.masterList?.[index]?.otherDegree;
  const fieldOfStudyError = errors?.masterList?.[index]?.fieldOfStudy;
  const completionStatusError = errors?.masterList?.[index]?.completionStatus;
  const graduationYearError = errors?.masterList?.[index]?.graduationYear;
  const institutionError = errors?.masterList?.[index]?.institution;
  const cgpaError = errors?.masterList?.[index]?.cgpa;
  return (
    <div key={index} className="master-section">
      <h5>Master's Degree {index + 1}</h5>
      <div className="form-group">
        <label>Degree Type: {renderRequiredAsterisk()}</label>
        <Controller
          name={`masterList.${index}.degreeType`}
          control={control}
          rules={{ required: "Degree type is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={MasterDegreeOptions}
              className={`select-bootstrap ${degreeTypeError && "is-invalid"}`}
              styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
            />
          )}
        />
        {degreeTypeError && (
          <div className="invalid-feedback">{degreeTypeError.message}</div>
        )}
      </div>

      {watch(`masterList.${index}.degreeType`)?.value === "Other" && (
        <div className="form-group mt-2">
          <label>Please specify the degree: {renderRequiredAsterisk()}</label>
          <input
            {...register(`masterList.${index}.otherDegree`, {
              required: "Please specify the degree",
            })}
            type="text"
            className={`form-control ${otherDegreeError && "is-invalid"}`}
          />
          {otherDegreeError && (
            <div className="invalid-feedback">{otherDegreeError.message}</div>
          )}
        </div>
      )}

      <div className="form-group">
        <label>Field of Study: {renderRequiredAsterisk()}</label>
        <Controller
          name={`masterList.${index}.fieldOfStudy`}
          control={control}
          rules={{ required: "Field of Study is required" }}
          render={({ field }) => (
            <Creatable
              {...field}
              options={masterFieldsOfStudy}
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
          name={`masterList.${index}.completionStatus`}
          control={control}
          rules={{ required: "Completion status is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: "1", label: "1st Year" },
                { value: "2", label: "2nd Year" },
                { value: "completed", label: "Completed" },
              ]}
              className={`select-bootstrap ${
                completionStatusError && "is-invalid"
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
          name={`masterList.${index}.graduationYear`}
          control={control}
          rules={{ required: "Year of graduation is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={Array.from({ length: 61 }, (_, i) => {
                const year = currentYear - i;
                return { value: year, label: year };
              })}
              className={`select-bootstrap ${
                graduationYearError && "is-invalid"
              }`}
              styles={{ control: (base) => ({ ...base, cursor: "pointer" }) }}
            />
          )}
        />
        {graduationYearError && (
          <div className="invalid-feedback">{graduationYearError.message}</div>
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
          {...register(`masterList.${index}.cgpa`, {
            required: "CGPA/Percentage is required",
            validate: cgpaValidation,
          })}
          type="text"
          className={`form-control ${cgpaError && "is-invalid"}`}
        />
        {cgpaError && (
          <div className="invalid-feedback">{cgpaError.message}</div>
        )}
      </div>

      {index !== 0 && (
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => removeMaster(index)}
        >
          Remove Master's Degree
        </button>
      )}
    </div>
  );
};

const Master = ({ masterFields, appendMaster, removeMaster }) => {
  return (
    <div className="section">
      <h4>Master's Degree Details:</h4>
      {masterFields.map((field, index) => (
        <RenderMasterFields
          key={field.id}
          index={index}
          removeMaster={removeMaster}
        />
      ))}
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={() => appendMaster({})}
      >
        + Add Master's Degree
      </button>
    </div>
  );
};

export default Master;