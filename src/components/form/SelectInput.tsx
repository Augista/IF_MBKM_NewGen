"use client";

import { ChevronDown, X } from "lucide-react";
import * as React from "react";
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import Select, { components, MultiValue, StylesConfig } from "react-select";

import LabelText from "@/components/form/LabelText";

import ErrorMessage from "@/components/form/ErrorMessage";
import HelperText from "@/components/form/HelperText";
import clsxm from "@/lib/clsxm";
import { ExtractProps } from "@/lib/helper";

export type SelectInputProps = {
  label: string | null;
  id: string;
  placeholder?: React.ReactNode;
  helperText?: string;
  type?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  options: { value: string | number; label: string }[];
  containerClassName?: string;
  errorMessageClassName?: string;
  labelTextClasname?: string;
} & React.ComponentPropsWithoutRef<"select"> &
  ExtractProps<Select>;

export default function SelectInput({
  disabled,
  readOnly,
  label,
  helperText,
  id,
  isMulti = false,
  isSearchable = true,
  placeholder,
  validation,
  options,
  hideError = false,
  containerClassName,
  errorMessageClassName,
  labelTextClasname,
  ...rest
}: SelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const reactId = React.useId();

  const withLabel = label !== null;

  //#region  //*=========== Styles ===========
  const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      border: `1px solid ${error ? "#EF4444" : "#6b7280"}`, // red-500 : gray-500
      "&:hover": {
        border: `1px solid ${error ? "#EF4444" : "#111827"}`, // red-500 : gray-900
        boxShadow: "inset 0 0 0 1px #111827",
      },
      boxShadow: `${error ? "inset 0 0 0 1px #EF4444" : "none"}`,
      transition: "all 300ms",
      "&:focus-within": {
        border: `1px solid ${error ? "#EF4444" : "#111827"}`, // red-500 : gray-900
        boxShadow: `0 0 0 1px ${error ? "#EF4444" : "#111827"}`, // red-500 : gray-900
      },
      "*": {
        boxShadow: "none !important",
      },
      borderRadius: "0.375rem",
      padding: "0 0.75rem",
      background:
        disabled || readOnly ? "#F3F4F6" : `${error ? "#FEE2E2" : "white"}`, // light gray : red-200 : white
      cursor: "pointer",
      color: "#111827", // gray-900
      margin: "0 auto",
      fontSize: "0.875rem",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      gap: "0.5rem",
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      caretColor: "#6b7280", // gray-500
      color: "#111827", // gray-900
      "::placeholder": {
        color: "#111827", // gray-900
      },
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      "&>div": {
        padding: 0,
      },
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#111827", // gray-900
      "&:hover": {
        color: "#878787", // gray
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: state.isFocused ? "white" : state.isSelected ? "white" : "#1e3a8a",
      fontWeight: state.isSelected ? "500" : "normal",
      background: state.isDisabled
        ? "#F3F4F6" // light gray
        : state.isFocused
          ? "#3b82f6" // blue-500
          : state.isSelected
            ? "#3b82f6" // blue-500
            : "white",
      borderRadius: "8px",
      ":hover": {
        background: "#60a5fa", // blue-400
        color: "white",
      },
      cursor: "pointer",
    }),
    multiValue: (styles) => ({
      ...styles,
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      background: "#3b82f6", // blue-500
      borderRadius: "0.375rem",
      padding: "0.25rem 0.75rem",
      margin: 0,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
      padding: 0,
      paddingLeft: 0,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "white",
      padding: 0,
      paddingLeft: "0.5rem",
      "&:hover": {
        color: "#93c5fd", // blue-300
        backgroundColor: "transparent",
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: "0.5rem",
      overflow: "hidden",
      maxHeight: "250px",
    }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: "250px",
      overflowY: "auto",
      scrollPaddingBottom: "0.5rem",
      padding: "0.5rem"
    }),
  };
  //#endregion  //*======== Styles ===========

  return (
    <div className={containerClassName}>
      {withLabel && (
        <LabelText
          required={!!validation?.required}
          labelTextClasname={labelTextClasname}
        >
          {label}
        </LabelText>
      )}
      <div
        className={clsxm(
          "relative",
          withLabel && "mt-1",
          (disabled || readOnly) && "cursor-not-allowed",
        )}
      >
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => {
            return (
              <Select
                {...field}
                value={
                  //? null is needed so if the selected value is not found in the options, it will clear the value
                  isMulti
                    ? field.value?.map(
                      (value: unknown) =>
                        options.find((option) => option.value === value) ??
                        null,
                    )
                    : options.find((opt) => opt.value === field.value) ?? null
                }
                onChange={(selectedOptions) => {
                  isMulti
                    ? field.onChange(
                      (
                        selectedOptions as MultiValue<
                          (typeof options)[number]
                        >
                      ).map((option) => option?.value ?? ""),
                    )
                    : field.onChange(
                      (selectedOptions as (typeof options)[number])?.value ??
                      "",
                    );
                }}
                isDisabled={disabled}
                isClearable
                isMulti={isMulti}
                isSearchable={isSearchable}
                closeMenuOnSelect={!isMulti}
                placeholder={placeholder}
                options={options}
                classNames={{
                  control: () => "!min-h-[2.25rem] md:!min-h-[2.5rem]",
                }}
                styles={customStyles}
                instanceId={reactId}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : undefined
                }
                menuPosition="fixed"
                menuPlacement="auto"
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <ChevronDown size={18} />
                    </components.DropdownIndicator>
                  ),
                  ClearIndicator: (props) => (
                    <components.ClearIndicator {...props}>
                      <X
                        size={18}
                        className="mr-0.5 text-typo-icons hover:text-typo-secondary"
                      />
                    </components.ClearIndicator>
                  ),
                  MultiValueRemove: (props) => (
                    <components.MultiValueRemove {...props}>
                      <X size={18} />
                    </components.MultiValueRemove>
                  ),
                }}
                {...rest}
              />
            );
          }}
        />
        {!hideError && error && (
          <ErrorMessage className={clsxm("mt-2", errorMessageClassName)}>
            {error?.message?.toString()}
          </ErrorMessage>
        )}
        {helperText && <HelperText>{helperText}</HelperText>}
      </div>
    </div>
  );
}
