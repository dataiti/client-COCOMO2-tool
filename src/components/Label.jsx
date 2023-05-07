import React from "react";

const Label = ({ className = "", htmlFor, label = "", isTitle = false }) => {
  return (
    <>
      {isTitle ? (
        <label
          className={`font-bold text-base text-black ${className}`}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      ) : (
        <label
          className={`font-semibold text-sm text-emerald-700 text-center ${className}`}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
    </>
  );
};

export default Label;
