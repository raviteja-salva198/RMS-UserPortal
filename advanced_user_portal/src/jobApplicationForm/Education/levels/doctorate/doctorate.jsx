import React, { useEffect } from "react";
import { renderRequiredAsterisk } from "../../Education";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { Controller, useFormContext } from "react-hook-form";
import cityOptions from "../../../formStaticData/optionCity.json";
import countryOptions from "../../../formStaticData/optionCountry.json";
import stateOptions from "../../../formStaticData/optionState.json";
import { currentYear } from "../../Education";
import { doctorateFieldsOfStudy } from "../../../formStaticData/optionsData";
import { institionOptions } from "../../../formStaticData/optionsData";

const RenderDoctorateFields = ({ index, removeDoctorate }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const country = watch(`doctorateList.${index}.country`);
  const state = watch(`doctorateList.${index}.state`);
  const city = watch(`doctorateList.${index}.city`);

  // Reset state and city when country changes
  useEffect(() => {
    setValue(`doctorateList.${index}.state`, null);
    setValue(`doctorateList.${index}.city`, null);
    setValue(`doctorateList.${index}.institution`, null);
  }, [country, setValue]);

  // Reset city when state changes
  useEffect(() => {
    setValue(`doctorateList.${index}.city`, null);
    setValue(`doctorateList.${index}.institution`, null);
  }, [state, setValue]);

  useEffect(() => {
    setValue(`doctorateList.${index}.institution`, null);
  }, [city, setValue]);

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
                errors?.doctorateList?.[index]?.completionStatus && "is-invalid"
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

const Doctorate = ({ doctorateFields, appendDoctorate, removeDoctorate }) => {
  return (
    <div className="section">
      <h4>Doctorate's Degree Details:</h4>
      {doctorateFields.map((field, index) => (
        <RenderDoctorateFields
          key={field.id}
          index={index}
          removeDoctorate={removeDoctorate}
        />
      ))}
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={() => appendDoctorate({})}
      >
        + Add Doctorate's Degree
      </button>
    </div>
  );
};

export default Doctorate;
