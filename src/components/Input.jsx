import React from "react";
import { Controller } from "react-hook-form";

const Input = ({
  type = "text",
  className = "",
  name = "",
  control,
  placeholder = "",
  setValue,
}) => {
  const handleChangeInput = (e) => {
    if (e.target.value.startsWith("-")) {
      return;
    }
    setValue(name, e.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={name === "reusedDM" || name === "reusedCM" ? "0" : ""}
      render={({ field }) => (
        <input
          type={type}
          className={`outline-none border border-gray-300 rounded-md py-1 px-2 ${
            name === "reusedDM" || name === "reusedCM"
              ? "select-none opacity-50 cursor-not-allowed"
              : ""
          }  placeholder:text-sm ${className}`}
          placeholder={placeholder}
          {...field}
          onChange={handleChangeInput}
        />
      )}
    />
  );
};

export default Input;
