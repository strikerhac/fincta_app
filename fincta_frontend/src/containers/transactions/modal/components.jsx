import React, { useState, useContext, useEffect } from "react";
import { DatePicker, Input, Slider } from "antd";
import {
  StyledFlexDiv,
  StyledDiv,
  StyleAnchor,
  StyledInput,
  StyledInputNumber,
  StyledSliderInput,
  StyledSlider,
} from "./styles/components.styles";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import moment from "moment";
import { RHFInput } from "react-hook-form-input";

export const CustomSlider = ({
  titleLeft,
  titleRight,
  min,
  max,
  setValue = null,
  setBCValue = null,
  value,
}) => {
  return (
    <div>
      <StyledFlexDiv>
        <StyledDiv width={15} pB={5}>
          {titleLeft}
        </StyledDiv>

        <StyledDiv width={15} pB={5}>
          {titleRight}
        </StyledDiv>
      </StyledFlexDiv>
      <StyledFlexDiv>
        <StyledSliderInput>{max - value}</StyledSliderInput>
        <StyledSlider
          min={min}
          max={max}
          value={value}
          onChange={(value) => {
            if (setValue != null) setValue(value);
            // if (setBCValue != null) setBCValue(value);
          }}
          getTooltipPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
          }}
        />
        <StyledSliderInput>{value}</StyledSliderInput>
      </StyledFlexDiv>
    </div>
  );
};

export const CustomInput = ({
  type = "string",
  title,
  width = 100,
  counter = false,
  value = null,
  setValue = null,
  setRPValue = null,
  setIPValue = null,
  setBCValue = null,
  required = true,
  maxQuantity = null,
  min = "0",
}) => {
  return (
    <div style={{ width: `${width}%` }}>
      <StyledFlexDiv>
        <StyledDiv width={100} pB={5}>
          {title}
        </StyledDiv>
        {title === "Description" ? (
          <StyledDiv width={width} pB={5}>
            {/* <a style={{ float: "right", fontSize: "clamp(10px, 2vw, 15px)" }}>
              + Add Receipts
            </a> */}
          </StyledDiv>
        ) : null}
      </StyledFlexDiv>

      {maxQuantity !== null ? (
        <StyledInput
          max={maxQuantity}
          type={type}
          min={min}
          required={required}
          width={counter ? 70 : 100}
          placeholder={title}
          value={value}
          onChange={(e) => {
            if (setValue != null) setValue(e.target.value);
            if (setRPValue != null) setRPValue(e.target.value);
            if (setBCValue != null) setBCValue(e.target.value);
          }}
        />
      ) : (
        <StyledInput
          type={type}
          min={min}
          required={required}
          width={counter ? 70 : 100}
          placeholder={title}
          value={value}
          onChange={(e) => {
            if (setValue != null) setValue(e.target.value);
            if (setRPValue != null) setRPValue(e.target.value);
            if (setBCValue != null) setBCValue(e.target.value);
            if (setIPValue != null) setIPValue(e.target.value);
          }}
        />
      )}
    </div>
  );
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 5,
    paddingLeft: 10,
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    // width: 300,
    padding: 0,
    innerHeight: 10,
    height: 10,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
export const CustomDropdown = ({
  title,
  options,
  creatable = true,
  onChange = null,
}) => {
  return (
    <div>
      <StyledDiv width={100} pB={5}>
        {`Select ${title}`}
      </StyledDiv>
      {creatable ? (
        <CreatableSelect
          isClearable
          onChange={(value) => onChange(value, title)}
          options={options}
          styles={customStyles}
        />
      ) : (
        <Select
          onChange={(value) => onChange(value, title)}
          className="basic-single"
          classNamePrefix="select"
          styles={customStyles}
          isClearable
          options={options}
        />
      )}
    </div>
  );
};

export const CustomDatePicker = ({
  onChange,
  title = null,
  defaultValue = moment(),
  disabled = false,
}) => {
  return (
    <div>
      <StyledDiv width={100} pB={5}>
        {`${title !== null ? title + " " : ""}`}Date
      </StyledDiv>
      <DatePicker
        disabled={disabled}
        required
        defaultValue={defaultValue}
        onChange={onChange}
        style={{ width: "100%", height: "27px", borderRadius: "5px" }}
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }}
      />
    </div>
  );
};
