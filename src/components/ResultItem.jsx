import React from "react";
import Label from "./Label";

const ResultItem = ({ label = "", result = 0, unit }) => {
  return (
    <div className="flex items-center gap-5">
      <Label label={label} className="font-bold" />
      <span> = </span>
      <div className="flex items-center gap-3">
        <p>{result}</p>
        <span className="text-sm font-semibold text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

export default ResultItem;
