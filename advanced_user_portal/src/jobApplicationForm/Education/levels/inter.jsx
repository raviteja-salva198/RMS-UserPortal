import React, { useEffect } from "react";
import { renderRequiredAsterisk } from "../Education";
import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import cityOptions from "../../formStaticData/optionCity.json";
import countryOptions from "../../formStaticData/optionCountry.json";
import stateOptions from "../../formStaticData/optionState.json";
import { currentYear, cgpaValidation } from "../Education";

const Inter = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const country = watch("12th.country");
  const state = watch("12th.state");
  const passingYearOfHighSchool = watch("10th.yearOfPassing");
  
  // Reset state and city when country changes
  useEffect(() => {
    setValue("12th.state", null);
    setValue("12th.city", null);
  }, [country, setValue]);

  // Reset city when state changes
  useEffect(() => {
    setValue("12th.city", null);
  }, [state, setValue]);
  return (
    <div className="section">
      <h4>12th Standard Details: New</h4>

      {/* Board */}
      <div className="form-group">
        <label>Board: {renderRequiredAsterisk()}</label>
        <Controller
          name="12th.board"
          control={control}
          rules={{ required: "Board is required" }}
          render={({ field }) => (
            <>
              <Select
                {...field}
                options={[
                  { value: "CBSE", label: "CBSE" },
                  { value: " ICSE", label: "ICSE" },
                  { value: "State Board", label: "State Board" },
                  { value: "Other", label: "Other" },
                ]}
                className="select-bootstrap"
                styles={{
                  control: (base) => ({ ...base, cursor: "pointer" }),
                }}
              />
              {errors["12th"]?.board && (
                <span className="text-danger">
                  {errors["12th"].board.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      {/* Year of Passing */}
      <div className="form-group">
        <label>Year of Passing: {renderRequiredAsterisk()}</label>
        <Controller
          name="12th.yearOfPassing"
          control={control}
          rules={{
            required: "Year of passing is required",
            validate: (value) =>
              Number(value.value) >=
                Number(passingYearOfHighSchool.value + 2) || "Invalid year gap",
          }}
          render={({ field }) => (
            <>
              <Select
                {...field}
                options={Array.from({ length: 61 }, (_, i) => {
                  const year = currentYear - i;
                  return { value: year, label: year };
                })}
                className="select-bootstrap"
                styles={{
                  control: (base) => ({ ...base, cursor: "pointer" }),
                }}
              />
              {errors["12th"]?.yearOfPassing && (
                <span className="text-danger">
                  {errors["12th"].yearOfPassing.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      {/* Location Fields */}
      <div className="form-group">
        <label>Country: {renderRequiredAsterisk()}</label>
        <Controller
          name="12th.country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={countryOptions}
              className={`react-select ${
                errors["12th"]?.country && "is-invalid"
              }`}
            />
          )}
        />
        {errors?.["12th"]?.country && (
          <div className="invalid-feedback">
            {errors["12th"].country.message}
          </div>
        )}
      </div>
      <div className="form-group">
        <label>State: {renderRequiredAsterisk()}</label>
        <Controller
          name="12th.state"
          control={control}
          rules={{ required: "State is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={
                country &&
                stateOptions.filter(
                  (state) => state.country_id === country?.country_id
                )
              }
              isDisabled={!country}
              className={`react-select ${
                errors["12th"]?.state && "is-invalid"
              }`}
            />
          )}
        />
        {errors?.["12th"]?.state && (
          <div className="invalid-feedback">{errors["12th"].state.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>City: {renderRequiredAsterisk()}</label>
        <Controller
          name="12th.city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={
                state &&
                cityOptions.filter((city) => city.state_id === state?.state_id)
              }
              isDisabled={!state}
              className={`react-select ${
                errors["12th"]?.state && "is-invalid"
              }`}
            />
          )}
        />
        {errors?.["12th"]?.city && (
          <div className="invalid-feedback">{errors["12th"].city.message}</div>
        )}
      </div>

      {/* School Name */}
      <div className="form-group">
        <label>School Name: {renderRequiredAsterisk()}</label>
        <input
          {...register("12th.school", {
            required: "School name is required",
          })}
          className="form-control"
        />
        {errors["12th"]?.school && (
          <span className="text-danger">{errors["12th"].school.message}</span>
        )}
      </div>

      {/* Percentage/CGPA */}
      <div className="form-group">
        <label>Percentage/CGPA: {renderRequiredAsterisk()}</label>
        <input
          {...register("12th.cgpa", {
            required: "Percentage/CGPA is required",
            validate: cgpaValidation,
          })}
          type="text"
          className="form-control"
        />
        {errors["12th"]?.cgpa && (
          <span className="text-danger">{errors["12th"].cgpa.message}</span>
        )}
      </div>
    </div>
  );
};

export default Inter;