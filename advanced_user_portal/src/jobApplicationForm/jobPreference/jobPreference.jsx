import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import Creatable from "react-select/creatable";
import countryData from "../formStaticData/country.json";
import cityData from "../formStaticData/cities.json";
import stateData from "../formStaticData/state.json";
import {
  willingnessOptions,
  workingHoursOptions,
  companySizeOptions,
  workEnvironmentOptions,
  roleLevelOptions,
  benefitsOptions,
  companyCultureOptions,
  currencyOptions,
  jobCategories } from '../formStaticData/optionData';

import {
  FormContainer,
  InputField,
  Label,
  Input,
  TextArea,
  RadioButtons,
  RadioGroup,
  CheckboxGroup,
  ErrorMessage,
  SubmitButton,
} from "./style";

const countryOptions = countryData.map((country) => ({
  value: country.country_name,
  label: country.country_name,
  country_id: country.country_id,
}));

const stateOptions = stateData.map((state) => ({
  value: state.state_name,
  label: state.state_name,
  country_id: state.country_id,
  state_id: state.state_id,
}));

const cityOptions = cityData.map((city) => ({
  value: city.city_name,
  label: city.city_name,
  state_id: city.state_id,
}));

const JobPreference = ({ setCurrentFormStep }) => {
  const {
    register,
    control,
    watch,
    trigger,
    resetField,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      positionAppliedFor: [],
      desiredIndustry: null,
      country: null,
      state: null,
      cities: [],
      currency: {
        value: "INR",
        label: "INR",
      },
      minSalary: "",
      maxSalary: "",
    },
  });

  const { desiredIndustry } = watch();
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  return (
    <FormContainer>
      <div>
        <InputField className="input-field">
          <Label htmlFor="desiredIndustry">Desired Industry</Label>
          <Controller
            name="desiredIndustry"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                isClearable
                {...field}
                options={Object.keys(jobCategories).map((val) => {
                  return { value: val, label: val };
                })}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  if (watch("positionAppliedFor")?.length > 0) {
                    resetField("positionAppliedFor");
                  }
                }}
              />
            )}
          />
          {errors.desiredIndustry && (
            <ErrorMessage style={{ color: "red" }}>
              This is required
            </ErrorMessage>
          )}
        </InputField>
        {desiredIndustry && (
          <InputField className="input-field">
            <Label htmlFor="positionAppliedFor">Position Applied For</Label>
            <Controller
              name="positionAppliedFor"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Creatable
                  isMulti
                  {...field}
                  options={jobCategories[desiredIndustry.value].map((val) => ({
                    value: val,
                    label: val,
                  }))}
                />
              )}
            />
            {errors.positionAppliedFor && (
              <ErrorMessage style={{ color: "red" }}>
                This is required
              </ErrorMessage>
            )}
          </InputField>
        )}

        <InputField className="input-field">
          <p>Current Employment Status</p>

          <RadioButtons className="radio-buttons">
            {["employed", "unemployed", "student", "other"].map((status) => (
              <RadioGroup key={status}>
                <Input
                  type="radio"
                  id={status}
                  value={status}
                  {...register("employmentStatus")}
                />
                <Label htmlFor={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Label>
              </RadioGroup>
            ))}
          </RadioButtons>
        </InputField>

        <InputField className="input-field">
          <p>Preferred Job Type</p>
          <CheckboxGroup>
            {["fulltime", "parttime", "contract", "internship"].map((type) => (
              <RadioGroup key={type}>
                <Input
                  type="checkbox"
                  id={type}
                  {...register(`preferredJobType.${type}`)}
                />
                <Label htmlFor={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Label>
              </RadioGroup>
            ))}
          </CheckboxGroup>
        </InputField>

        <InputField className="input-field">
          <p>Preferred Work Location</p>
          <div>
            <div>
              <Label htmlFor="country">Country:</Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="country"
                    options={countryOptions}
                    placeholder="Select Country"
                  />
                )}
              />
            </div>

            {selectedCountry && (
              <div>
                <Label htmlFor="state">State:</Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="state"
                      options={stateOptions.filter(
                        (state) =>
                          state.country_id === selectedCountry.country_id
                      )}
                      placeholder="Select State"
                    />
                  )}
                />
              </div>
            )}

            {selectedState && (
              <div>
                <Label htmlFor="city">City:</Label>
                <Controller
                  name="cities"
                  control={control}
                  render={({ field }) => (
                    <Creatable
                      {...field}
                      options={cityOptions.filter(
                        (city) => city.state_id === selectedState.state_id
                      )}
                      placeholder="Select City/Cities (Multi-select)"
                      isMulti
                    />
                  )}
                />
              </div>
            )}
          </div>
        </InputField>

        <InputField className="input-field">
          <p>Desired Salary</p>
          <div className="desired-salary-inputs-container">
            <div className="currency-select-container">
              <Label htmlFor="currencySelect">Currency:</Label>
              <Controller
                name="currency"
                control={control}
                rules={{ required: "Currency is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={currencyOptions}
                    classNamePrefix="react-select"
                  />
                )}
              />
              {errors.currency && (
                <ErrorMessage className="error-message">
                  {errors.currency.message}
                </ErrorMessage>
              )}
            </div>

            <div>
              <Label htmlFor="minSalary">Min Salary:</Label>
              <Input
                type="number"
                id="minSalary"
                {...register("minSalary", {
                  required: "Minimum salary is required",
                  min: {
                    value: 0,
                    message: "Minimum salary must be non-negative",
                  },
                })}
              />
              {errors.minSalary && (
                <ErrorMessage className="error-message">
                  {errors.minSalary.message}
                </ErrorMessage>
              )}
            </div>

            <div>
              <Label htmlFor="maxSalary">Max Salary:</Label>
              <Input
                type="number"
                id="maxSalary"
                {...register("maxSalary", {
                  required: "Maximum salary is required",
                  min: {
                    value: 0,
                    message: "Maximum salary must be non-negative",
                  },
                  validate: (value) =>
                    value >= 0 ||
                    "Maximum salary must be greater than or equal to zero",
                })}
              />
              {errors.maxSalary && (
                <ErrorMessage className="error-message">
                  {errors.maxSalary.message}
                </ErrorMessage>
              )}
            </div>
          </div>
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="availabilityToStart">Availability to Start</Label>
          <Input
            type="date"
            placeholder="Availability to Start"
            {...register("availabilityToStart", {})}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="willingnessToRelocate">Willingness to Relocate</Label>
          <Controller
            name="willingnessToRelocate"
            control={control}
            render={({ field }) => (
              <Select {...field} options={willingnessOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="willingnessToTravel">Willingness to Travel</Label>
          <Controller
            name="willingnessToTravel"
            control={control}
            render={({ field }) => (
              <Select {...field} options={willingnessOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="preferredWorkingHours">Preferred Working Hours</Label>
          <Controller
            name="preferredWorkingHours"
            control={control}
            render={({ field }) => (
              <Select {...field} options={workingHoursOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="preferredCompanySize">Preferred Company Size</Label>
          <Controller
            name="preferredCompanySize"
            control={control}
            render={({ field }) => (
              <Select {...field} options={companySizeOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="preferredWorkEnvironment">
            Preferred Work Environment
          </Label>
          <Controller
            name="preferredWorkEnvironment"
            control={control}
            render={({ field }) => (
              <Select {...field} options={workEnvironmentOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="preferredRoleLevel">Preferred Role Level</Label>
          <Controller
            name="preferredRoleLevel"
            control={control}
            render={({ field }) => (
              <Select {...field} options={roleLevelOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="desiredBenefits">Desired Benefits</Label>
          <Controller
            name="desiredBenefits"
            control={control}
            render={({ field }) => (
              <Select {...field} options={benefitsOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="preferredCompanyCulture">
            Preferred Company Culture
          </Label>
          <Controller
            name="preferredCompanyCulture"
            control={control}
            render={({ field }) => (
              <Select {...field} options={companyCultureOptions} />
            )}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="careerGoals">Career Goals</Label>
          <TextArea
            id="careerGoals"
            placeholder="Career Goals"
            maxLength="200"
            rows="5"
            {...register("careerGoals")}
          />
        </InputField>

        <InputField className="input-field">
          <Label htmlFor="additionalPreferencesOrComments">
            Additional Preferences or Comments
          </Label>
          <TextArea
            id="additionalPreferencesOrComments"
            placeholder="Additional Preferences or Comments"
            maxLength="200"
            rows="5"
            {...register("additionalPreferencesOrComments")}
          />
        </InputField>
        <button
          onClick={() => {
            // trigger run form validation
            setCurrentFormStep(2);
          }}
        >
          Back
        </button>
        <SubmitButton
          type="button"
          onClick={async () => {
            //TODO: run form validation
            const output = await trigger();
            console.log(output);
            if (!output) return;
            setCurrentFormStep(4);
          }}
        >
          Next
        </SubmitButton>
      </div>
    </FormContainer>
  );
};

export default JobPreference;