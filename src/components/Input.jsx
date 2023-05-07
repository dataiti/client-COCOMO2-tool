import React from "react";
import { Controller } from "react-hook-form";

const Input = ({ className = "", name = "", control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={name === "reusedDM" || name === "reusedCM" ? "0" : ""}
      render={({ field }) => (
        <input
          type="text"
          className={`outline-none border border-gray-300 rounded-md py-1 px-2 ${className}`}
          {...field}
        />
      )}
    />
  );
};

export default Input;
